// Fungsi untuk mengupload gambar
function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const storageRef = storage.ref('gallery/' + file.name); // Tentukan path penyimpanan gambar

    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            console.error('Upload failed:', error);
        }, 
        () => {
            // Upload selesai
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);

                // Tambahkan gambar ke galeri
                const galleryGrid = document.getElementById('galleryGrid');
                const newImageDiv = document.createElement('div');
                newImageDiv.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'cursor-pointer', 'transform', 'hover:scale-105', 'transition', 'duration-300');

                const newImg = document.createElement('img');
                newImg.src = downloadURL;
                newImg.alt = 'Uploaded Art';
                newImg.classList.add('w-full', 'h-48', 'object-cover');

                // Tentukan judul, deskripsi, dan nama artis (Anda bisa mengganti ini dengan input dari pengguna)
                const title = "Artwork Title"; // Ganti dengan judul yang sesuai
                const description = "Description of the artwork."; // Ganti dengan deskripsi yang sesuai
                const artistName = "Artist Name"; // Ganti dengan nama artis yang sesuai

                // Tambahkan event listener untuk membuka modal
                newImg.addEventListener('click', () => {
                    openModal(downloadURL, title, description, artistName);
                });

                newImageDiv.appendChild(newImg);
                galleryGrid.appendChild(newImageDiv);
            });
        }
    );
}

// Fungsi untuk membuka modal
function openModal(imageUrl, title, description, artist) {
    const modal = document.getElementById('artModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalArtist = document.getElementById('artistName');

    modalImage.src = imageUrl; // Set gambar pada modal
    modalTitle.textContent = title; // Set judul pada modal
    modalDescription.textContent = description; // Set deskripsi pada modal
    modalArtist.textContent = artist; // Set nama artis pada modal

    modal.classList.remove('hidden'); // Tampilkan modal
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('artModal');
    modal.classList.add('hidden'); // Sembunyikan modal
}
