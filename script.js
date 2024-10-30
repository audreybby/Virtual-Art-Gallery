const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const artModal = document.getElementById('artModal');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });
}

function openModal(element) {
    const imageSrc = element.getAttribute('data-image');
    const title = element.getAttribute('data-title');
    const description = element.getAttribute('data-description');
    const artist = element.getAttribute('data-artist');

    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('modalArtist').querySelector("span").innerText = artist;

    artModal.classList.remove('modal-hidden'); 
    artModal.classList.add('flex'); 
}

  function closeModal() {
    artModal.classList.add('modal-hidden'); 
    artModal.classList.remove('flex');
  }

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgSrc = e.target.result;

            const galleryGrid = document.getElementById('galleryGrid');
            const newImageDiv = document.createElement('div');
            newImageDiv.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'cursor-pointer', 'transform', 'hover:scale-105', 'transition', 'duration-300');
            
            const newImg = document.createElement('img');
            newImg.src = imgSrc;
            newImg.alt = 'Uploaded Art';
            newImg.classList.add('w-full', 'h-48', 'object-cover');

            newImageDiv.appendChild(newImg);
            galleryGrid.appendChild(newImageDiv);
        };
        reader.readAsDataURL(file);
    }
});

function addBubble() {
    const bubbleContainer = document.getElementById('bubbleContainer');
    const bubbleInput = document.getElementById('bubbleInput');
    const text = bubbleInput.value.trim();

    if (text) {
      const newBubble = document.createElement('div');
      newBubble.className = 'bg-gray-300 text-gray-900 px-4 py-2 rounded-full shadow-md text-center';
      newBubble.textContent = `"${text}"`;

      bubbleContainer.appendChild(newBubble);

      bubbleInput.value = '';
    }
  }