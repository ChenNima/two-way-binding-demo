document.addEventListener("DOMContentLoaded", function() {
  var a = {data: ''};
  var b = {data: ''};
  window.a = a;
  window.b = b;
  const input = document.getElementById('input');
  const input2 = document.getElementById('input2');
  const p1 = document.getElementById('p1');
  const p2 = document.getElementById('p2');

  function Observer(obj, key, value){
    var dep = new Dep();
    if (Object.prototype.toString.call(value) == '[object Object]') {
      Object.keys(value).forEach(function(key){
        new Observer(value,key,value[key])
      })
    };
  
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function(){
        if (Dep.target) {
          dep.addSub(Dep.target);
        };
        return value;
      },
      set: function(newVal){
        value = newVal;
        dep.notify();
      }
    })
  }

  function Watcher(fn){
    Dep.target = this;
    fn();
    Dep.target = null;
    this.update = fn;
  }

  function Dep(){
    this.subs = [];
  
    this.addSub = function (watcher) {
      this.subs.push(watcher);
    }
  
    this.notify = function(){
      this.subs.forEach(function(watcher){
        watcher.update();
      });
    }
  }

  Object.keys(a).forEach(function(key){
		new Observer(a, key, a[key])
  });
  Object.keys(b).forEach(function(key){
		new Observer(b, key, b[key])
	});

  new Watcher(() => {
    p1.innerText = a.data + b.data;
  })
  new Watcher(() => {
    p2.innerText = a.data + b.data;
  })
  new Watcher(() => {
    input.value = a.data;
  })

  new Watcher(() => {
    input2.value = b.data;
  })

  input.oninput = (e) => {
    a.data = e.target.value;
  }
  input2.oninput = (e) => {
    b.data = e.target.value;
  }

  window.Watcher = Watcher;
});