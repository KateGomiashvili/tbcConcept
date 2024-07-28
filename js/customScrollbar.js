document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.scroll-container');
    const content = document.querySelector('.scroll-content');
    const scrollbar = document.querySelector('.custom-scrollbar-vertical');
    const thumb = document.querySelector('.thumb');
  
    // Update thumb height and position
    function updateThumb() {
      const contentHeight = content.scrollHeight;
      const containerHeight = container.clientHeight;
      const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
      thumb.style.height = `${thumbHeight}px`;
  
      const scrollRatio = content.scrollTop / (contentHeight - containerHeight);
      const thumbPosition = scrollRatio * (containerHeight - thumbHeight);
      thumb.style.top = `${thumbPosition}px`;
    }
  
    // Sync content scroll with thumb position
    content.addEventListener('scroll', updateThumb);
  
    // Scroll content when thumb is dragged
    let isDragging = false;
  
    thumb.addEventListener('mousedown', function (e) {
      isDragging = true;
      document.body.classList.add('no-select');
      const startY = e.clientY;
      const startTop = thumb.offsetTop;
  
      function onMouseMove(e) {
        if (!isDragging) return;
        const deltaY = e.clientY - startY;
        const newTop = Math.min(container.clientHeight - thumb.clientHeight, Math.max(0, startTop + deltaY));
        thumb.style.top = `${newTop}px`;
        const scrollRatio = newTop / (container.clientHeight - thumb.clientHeight);
        content.scrollTop = scrollRatio * (content.scrollHeight - container.clientHeight);
      }
  
      function onMouseUp() {
        isDragging = false;
        document.body.classList.remove('no-select');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  
    // Initial thumb update
    updateThumb();
  });