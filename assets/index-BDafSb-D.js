(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const d=document.querySelector("#taskList");function u(s,r){d.innerHTML="",s.forEach(o=>{const n=document.createElement("li"),e=new Date(o.deadline),t=!o.completed&&e<new Date;n.innerHTML=`
      <div>
        <strong>${o.title}</strong> 
        <em>(${o.category})</em> 
        <span>→ ${o.assignedTo}</span> 
        <time>${e.toLocaleString()}</time>
        ${t?'<span class="overdue">⚠️ Просрочено</span>':""}
      </div>
      <button data-id="${o.id}">✓</button>
    `,n.querySelector("button").addEventListener("click",()=>{r(o.id)}),o.completed&&n.classList.add("completed"),t&&n.classList.add("overdue"),d.appendChild(n)})}let i=[];const l=document.querySelector("#taskForm");l.addEventListener("submit",s=>{s.preventDefault();const r=document.querySelector("#title").value.trim(),o=document.querySelector("#category").value,n=document.querySelector("#deadline").value,e=document.querySelector("#assignedTo").value.trim(),t={id:Date.now(),title:r,category:o,deadline:n,assignedTo:e,completed:!1};i.push(t),l.reset(),u(i,a)});function a(s){const r=i.find(o=>o.id===s);r&&(r.completed=!r.completed,u(i,a))}
