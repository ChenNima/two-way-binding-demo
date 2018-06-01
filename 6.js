document.addEventListener("DOMContentLoaded", function() {

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

  var a = {data: ''};
  var b = {data: ''};
  window.a = a;
  window.b = b;
  const input = document.getElementById('input');
  const input2 = document.getElementById('input2');
  const p1 = document.getElementById('p1');
  const p2 = document.getElementById('p2');

  function Component({ data, computed }) {
    this.data = data;
    Object.keys(data).forEach(function(key){
      new Observer(data, key, data[key])
    });
    Object.keys(computed).forEach((key) => {
      new Observer(this, key, undefined);
      new Watcher(() => {
        this[key] = computed[key].call(this);
      })
    });
  }

  var app = new Component({
    data: {
      value1: 'value1',
      value2: 'value2'
    },
    computed: {
      computedData() {
        return this.data.value1 + this.data.value2;
      }
    }
  });

  window.app = app;
  window.Component = Component;


  new Watcher(() => {
    p1.innerText = app.computedData;
  })

  new Watcher(() => {
    p2.innerText = app.computedData;
  })

  new Watcher(() => {
    input.value = app.data.value1;
  })

  new Watcher(() => {
    input2.value = app.data.value2;
  })

  input.oninput = (e) => {
    app.data.value1 = e.target.value;
  }
  input2.oninput = (e) => {
    app.data.value2 = e.target.value;
  }

  window.Watcher = Watcher;
});