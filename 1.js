document.addEventListener("DOMContentLoaded", function() { 
  const input = document.getElementById('input');
  const p1 = document.getElementById('p1');

  input.oninput = (e) => {
    p1.innerText = e.target.value;
  }
});