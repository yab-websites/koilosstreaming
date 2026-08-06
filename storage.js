// storage.js
// Simple IndexedDB wrapper for the nigunim app.
// Exposes: nigunimInit(), nigunimAddTrack(track), nigunimGetAllTracks(), nigunimDeleteTrack(id)
//
// Track object saved shape:
// { title, tags, cover, dur, blob, addedAt }
//
// Usage: include <script src="storage.js"></script> before admin/index scripts.

(function(global){
  const DB_NAME = 'nigunim_db_v1';
  const DB_STORE = 'tracks';
  let dbPromise = null;

  function openDB(){
    if(dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject)=>{
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = (ev)=>{
        const db = ev.target.result;
        if(!db.objectStoreNames.contains(DB_STORE)){
          const store = db.createObjectStore(DB_STORE, { keyPath: 'id', autoIncrement: true });
          store.createIndex('addedAt', 'addedAt', { unique: false });
        }
      };
      req.onsuccess = ()=> resolve(req.result);
      req.onerror = ()=> reject(req.error);
    });
    return dbPromise;
  }

  async function nigunimInit(){ await openDB(); }

  async function nigunimAddTrack(track){
    // track: {title, tags, cover, dur, blob, addedAt}
    const db = await openDB();
    return new Promise((resolve, reject)=>{
      const tx = db.transaction(DB_STORE, 'readwrite');
      const store = tx.objectStore(DB_STORE);
      const req = store.add(track);
      req.onsuccess = ()=> resolve(req.result);
      req.onerror = ()=> reject(req.error);
    });
  }

  async function nigunimGetAllTracks(){
    const db = await openDB();
    return new Promise((resolve, reject)=>{
      const tx = db.transaction(DB_STORE, 'readonly');
      const store = tx.objectStore(DB_STORE);
      const req = store.getAll();
      req.onsuccess = ()=> resolve(req.result || []);
      req.onerror = ()=> reject(req.error);
    });
  }

  async function nigunimDeleteTrack(id){
    const db = await openDB();
    return new Promise((resolve, reject)=>{
      const tx = db.transaction(DB_STORE, 'readwrite');
      const store = tx.objectStore(DB_STORE);
      const req = store.delete(id);
      req.onsuccess = ()=> resolve();
      req.onerror = ()=> reject(req.error);
    });
  }

  // helper to compute duration of an audio Blob (using HTMLAudioElement)
  function computeDuration(blob, timeoutMs=5000){
    return new Promise((resolve)=>{
      try{
        const url = URL.createObjectURL(blob);
        const a = document.createElement('audio');
        let settled = false;
        const cleanup = ()=>{
          if(settled) return;
          settled = true;
          a.src = '';
          URL.revokeObjectURL(url);
          a.remove();
        };
        a.preload = 'metadata';
        a.src = url;
        a.addEventListener('loadedmetadata', ()=>{
          const d = isFinite(a.duration) ? Math.round(a.duration) : 0;
          cleanup();
          resolve(d);
        }, { once: true });
        a.addEventListener('error', ()=>{
          cleanup();
          resolve(0);
        }, { once: true });
        // fallback timeout
        setTimeout(()=>{ cleanup(); resolve(0); }, timeoutMs);
        // keep element offscreen
        a.style.position = 'absolute';
        a.style.left = '-9999px';
        document.body.appendChild(a);
      }catch(e){
        resolve(0);
      }
    });
  }

  // Expose
  global.nigunimInit = nigunimInit;
  global.nigunimAddTrack = nigunimAddTrack;
  global.nigunimGetAllTracks = nigunimGetAllTracks;
  global.nigunimDeleteTrack = nigunimDeleteTrack;
  global._nigunimComputeDuration = computeDuration;
})(window);