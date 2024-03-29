const modes = {
  FOCUS_MODE: 'Focus Mode',
  TRACE_MODE: 'Trace Mode'
}
const traceFunctions = {
  SHORTEST_PATH: 'shortest-path',
  ALL_PATHS: 'all-paths',
  USER_DEFINED_PATH: 'user-defined-path',
  NODE_TO_LEAF: 'node-to-leaf',
  NODE_SIMILARITY: 'node-similarity'
}
let currentMode = modes.FOCUS_MODE;
const tracingElements = Array.from(document.getElementsByClassName('tracing'));

tracingElements.forEach(e => {
  if (e.classList.contains('label')) {
    e.style.color = '#333333';
  } else {
    e.style.display = 'none';
  }
});

function focusModeClickHandler(e) {
  const pattern = new RegExp(`(^|\-\>)${e.target.classList.value}($|\-\>)`);
  postData(paths.filter(p => pattern.test(p)));
}

function toggleMode() {
  if (currentMode === modes.FOCUS_MODE) {
    currentMode = modes.TRACE_MODE;
    document.getElementById('body').classList = 'trace-mode';
    tracingElements.forEach(e => {
      if (/label/.test(e.classList)) {
        e.style.color = '#FFFFFF';
      }
      e.style.display = /label/.test(e.classList) ? 'grid' : 'block'
    });

    nodes.forEach(n => {
      n.removeEventListener('click', focusModeClickHandler);
    });
  
    labels.forEach(l => {
      l.removeEventListener('click', focusModeClickHandler);
    });
  } else {
    currentMode = modes.FOCUS_MODE;
    document.getElementById('body').classList = '';
    tracingElements.forEach(e => {
      if (e.classList.contains('label')) {
        e.style.color = '#333333';
      }
      else {
        e.style.display = 'none';
        e.classList.remove('active');
      }
    });

    cleanup(true);
    
    nodes.forEach(n => {
      n.addEventListener('click', focusModeClickHandler);

      nodeFill = n.style.fill;
      n.addEventListener('mouseover', () => {
        n.style.fill = 'rgba(103, 190, 217, 0.6)';
      });
      n.addEventListener('mouseleave', () => {
        n.style.fill = nodeFill;
      });
    });
    
    labels.forEach(l => {
      l.addEventListener('click', focusModeClickHandler);

      let parentNode = nodes.find(n => n.classList.value === l.classList.value);
      if (parentNode) {
        parentFill = parentNode.style.fill;
        l.addEventListener('mouseover', () => {
          parentNode.style.fill = 'rgba(103, 190, 217, 0.6)';
        });
        l.addEventListener('mouseleave', () => {
          parentNode.style.fill = parentFill;
        });
      }
    });
  }

  document.getElementById('toggle-mode').innerText = currentMode;
}

nodes.forEach(n => {
  n.addEventListener('click', focusModeClickHandler);
});

labels.forEach(l => {
  l.addEventListener('click', focusModeClickHandler);
});