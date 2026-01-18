
        let currentSlide = 1;
        const totalSlides = 6;

        function updateProgressBar() {
            const progress = (currentSlide / totalSlides) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            
            if (n > totalSlides) currentSlide = totalSlides;
            if (n < 1) currentSlide = 1;
            
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide - 1].classList.add('active');
            
            document.getElementById('current').textContent = currentSlide;
            
            document.getElementById('prevBtn').disabled = currentSlide === 1;
            document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
            
            updateProgressBar();
            
            // Add rain effect on precipitation slide
            if (currentSlide === 4) {
                addRainEffect();
            }
        }

        function addRainEffect() {
            const slide4 = document.getElementById('slide4');
            for (let i = 0; i < 30; i++) {
                const rain = document.createElement('div');
                rain.className = 'rain';
                rain.style.left = Math.random() * 100 + '%';
                rain.style.animationDelay = Math.random() * 2 + 's';
                rain.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
                slide4.appendChild(rain);
            }
        }

        function changeSlide(n) {
            currentSlide += n;
            showSlide(currentSlide);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        });

        // Download function
        function downloadPresentation() {
            const htmlContent = document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Water_Cycle_Presentation_Jason_Pun.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show success message
            alert('✅ Presentation downloaded successfully! Open the file in any browser to view.');
        }

        // Initialize
        showSlide(currentSlide);