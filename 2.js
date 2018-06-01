document.addEventListener("DOMContentLoaded", function() {
  var a = {};
  window.a = a;
  const input = document.getElementById('input');
  const p1 = document.getElementById('p1');

  Object.defineProperty(a, 'data', {
    get() {
      return a._data;
    },
    set(value) {
      p1.innerText = value;
      input.value = value;
      a._data = value;
    }
  })

  input.oninput = (e) => {
    a.data = e.target.value;
  }
});