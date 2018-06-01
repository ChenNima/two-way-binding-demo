document.addEventListener("DOMContentLoaded", function() {
  var a = {};
  window.a = a;
  const input = document.getElementById('input');
  const p1 = document.getElementById('p1');

  function Observer(obj, key, value) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function(){
        return value;
      },
      set: function(newVal){
        value = newVal;
        input.value = value;
        p1.innerText = value;
      }
    })
  }

  new Observer(a, 'data', null);

  input.oninput = (e) => {
    a.data = e.target.value;
  }
});