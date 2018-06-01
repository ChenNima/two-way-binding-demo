document.addEventListener("DOMContentLoaded", function() {
  var a = {};
  window.a = a;
  const input = document.getElementById('input');
  const p1 = document.getElementById('p1');
  const p2 = document.getElementById('p2');

  Object.prototype.pushWatcher = function(sub, key) {
    this.subs = this.subs || {};
    this.subs[key] = this.subs[key] || [];
    this.subs[key].push(sub);
  }

  function Observer(obj, key, value) {
    obj.subs = obj.subs || {};
    obj.subs[key] = obj.subs[key] || [];
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function(){
        return value;
      },
      set: function(newVal){
        value = newVal;
        this.subs[key].forEach(sub => sub());
      }
    })
  }

  function Watcher(obj, key, fn){
    obj.pushWatcher(fn, key);
  }

  new Observer(a, 'data', null);

  new Watcher(a, 'data', () => {p1.innerText = a.data})
  new Watcher(a, 'data', () => {p2.innerText = a.data})
  new Watcher(a, 'data', () => {input.value = a.data})

  input.oninput = (e) => {
    a.data = e.target.value;
  }
});