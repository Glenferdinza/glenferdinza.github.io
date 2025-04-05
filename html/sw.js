// Service worker untuk melindungi aset
self.addEventListener('fetch', function(event) {
    // Jika permintaan untuk file JS
    if (event.request.url.endsWith('.js')) {
        event.respondWith(
            fetch(event.request)
            .then(function(response) {
                // Clone respons
                const newResponse = response.clone();
                
                // Proses respons untuk mempersulit debugging
                return newResponse.text().then(function(text) {
                    // Disini Anda bisa mengobfuskasi kode lebih lanjut
                    // atau menambahkan kode anti-debugging tambahan
                    
                    // Contoh: tambahkan kode anti-debugging
                    const modifiedJS = text + `
                    // Anti-debugging
                    (function() {
                        setInterval(function() {
                            const startTime = new Date();
                            debugger;
                            const endTime = new Date();
                            if (endTime - startTime > 100) {
                                document.body.innerHTML = "Debugging detected!";
                            }
                        }, 1000);
                    })();
                    `;
                    
                    // Kembalikan respons yang dimodifikasi
                    return new Response(modifiedJS, {
                        headers: {
                            'Content-Type': 'application/javascript',
                            'Cache-Control': 'no-store'
                        }
                    });
                });
            })
        );
    }
});
        // Function untuk sanitasi input (tambahkan di bagian script)
        function sanitizeInput(input) {
            if (!input) return input;
            
            // Konversi input menjadi string jika bukan string
            if (typeof input !== 'string') {
                input = String(input);
            }
            
            // Escape karakter khusus HTML
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            
            return input.replace(/[&<>"']/g, function(m) { return map[m]; });
        }
        
        // Fungsi untuk memvalidasi input
        function validateInput(input, pattern) {
            if (!pattern) {
                // Pattern default untuk text biasa (alfanumerik, spasi dan tanda baca umum)
                pattern = /^[a-zA-Z0-9\s.,!?-]+$/;
            }
            return pattern.test(input);
        }
        
        // Contoh penggunaan untuk form (tambahkan jika ada form)
        document.addEventListener('DOMContentLoaded', function() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    let isValid = true;
                    
                    // Validasi semua input dalam form
                    const inputs = this.querySelectorAll('input, textarea');
                    inputs.forEach(input => {
                        const value = input.value;
                        const sanitized = sanitizeInput(value);
                        
                        // Jika ada perbedaan setelah sanitasi, berarti ada karakter mencurigakan
                        if (value !== sanitized) {
                            isValid = false;
                            input.classList.add('error');
                            
                            // Opsional: tambahkan pesan error
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Input mengandung karakter yang tidak diperbolehkan';
                            input.parentNode.appendChild(errorMsg);
                        }
                    });
                    
                    // Hentikan submit jika tidak valid
                    if (!isValid) {
                        e.preventDefault();
                        alert('Form mengandung input yang tidak valid. Mohon periksa kembali.');
                    }
                });
            });
        });
        
            // Kode untuk mempersulit akses konsol dan modifikasi kode
        (function() {
            // 1. Deteksi dan kembalikan jika konsol dibuka
            let devtoolsOpen = false;
            
            // Metode 1: Deteksi melalui ukuran jendela (pendeteksi konsol samping)
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            if (widthThreshold || heightThreshold) {
                devtoolsOpen = true;
            }
            
            // Metode 2: Deteksi debugger
            const div = document.createElement('div');
            Object.defineProperty(div, 'id', {
                get: function() {
                    devtoolsOpen = true;
                    return 'x';
                }
            });
            console.log(div);
            console.clear();
            
            // Metode 3: Periksa fungsi console.log
            const originalConsoleLog = console.log;
            console.log = function() {
                if (arguments[0] === div && !arguments[0].id) {
                    devtoolsOpen = true;
                }
                originalConsoleLog.apply(console, arguments);
            };
            
            // Fungsi untuk bertindak ketika developer tools terdeteksi
            function handleDevTools() {
                if (devtoolsOpen) {
                    // Redirect atau tutup jendela atau tampilkan pesan peringatan
                    document.body.innerHTML = "<h1>Developer tools detected. This action has been logged.</h1>";
                    // Atau sebagai alternatif:
                    // window.location.href = "blocked.html";
                    return true;
                }
                return false;
            }
            
            // 2. Mencegah inspect element melalui klik kanan
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                alert("Yaela mau nyoba inspect ya ka? xixixi😝");
                return false;
            });
            
            // 3. Mencegah shortcut keyboard umum untuk developer tools
            document.addEventListener('keydown', function(e) {
                // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, F12
                if (
                    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
                    (e.keyCode === 123)
                ) {
                    e.preventDefault();
                    alert("Shortcut untuk developer tools dinonaktifkan!");
                    return false;
                }
                
                // Ctrl+U (Lihat source)
                if (e.ctrlKey && e.keyCode === 85) {
                    e.preventDefault();
                    alert("Melihat source code dinonaktifkan!");
                    return false;
                }
            });
            
            // 4. Pencegahan copy-paste (opsional, sesuai kebutuhan)
            document.addEventListener('copy', function(e) {
                // Komentar baris berikut jika Anda ingin mengizinkan pengguna untuk menyalin teks
                // e.preventDefault();
                // alert("Menyalin konten dari website ini dinonaktifkan!");
            });
            
            // 5. Self-defending code
            setInterval(function() {
                handleDevTools();
                
                // Periksa modifikasi DOM
                const checkDOM = document.querySelectorAll('script').length;
                if (window.scriptCount === undefined) {
                    window.scriptCount = checkDOM;
                } else if (window.scriptCount !== checkDOM) {
                    alert("Modifikasi DOM terdeteksi!");
                    window.location.reload();
                }
            }, 1000);
            
            // 6. Obfuskasi kode
            // Gunakan layanan seperti https://obfuscator.io/ untuk mengobfuskasi kode JS Anda sebelum di-deploy
            
            // 7. Anti-debugging
            function antiDebug() {
                const startTime = new Date().getTime();
                debugger;
                const endTime = new Date().getTime();
                
                // Jika debugger sedang aktif, ini akan menghabiskan waktu lebih lama
                if (endTime - startTime > 100) {
                    // Debugger terdeteksi
                    document.body.innerHTML = "<h1>Debugging detected. This action has been logged.</h1>";
                }
                
                setTimeout(antiDebug, 1000);
            }
            antiDebug();
            
            // 8. Membuat script non-inspectable
            (() => {
                // Kode penting disini
                const message = "Modified environment detected. This action has been logged.";
                
                // Deteksi perubahan fungsi native
                const nativeToString = Object.prototype.toString;
                const nativeFnToString = Function.prototype.toString;
                const nativeSymbol = Symbol.prototype.toString;
                
                // Fungsi untuk memvalidasi integritas lingkungan
                function checkEnvIntegrity() {
                    try {
                        if (
                            Object.prototype.toString !== nativeToString ||
                            Function.prototype.toString !== nativeFnToString ||
                            Symbol.prototype.toString !== nativeSymbol
                        ) {
                            throw new Error("Environment modified");
                        }
                        
                        return true;
                    } catch (e) {
                        document.body.innerHTML = message;
                        return false;
                    }
                }
                
                // Pemeriksaan integritas secara berkala
                setInterval(checkEnvIntegrity, 2000);
            })();
        })();
        
            // Servise Worker
            // Daftarkan service worker (tambahkan pada script utama)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        }
        document.addEventListener('DOMContentLoaded', function() {
            // Sisipkan watermark tersembunyi
            const watermark = document.createElement('div');
            watermark.style.display = 'none';
            watermark.setAttribute('data-owner', 'Website milik [Nama Anda] - Mencuri kode ini melanggar hukum');
            watermark.setAttribute('data-timestamp', new Date().toISOString());
            watermark.setAttribute('data-id', 'wm-' + Math.random().toString(36).substring(2, 15));
            document.body.appendChild(watermark);
        });
            // hidden watermark 
        window.__securityCheck = true;
        window.__honeypot = "Do not modify this value";
        
        setInterval(function() {
            if (window.__securityCheck !== true || window.__honeypot !== "Do not modify this value") {
                // Kode telah dimodifikasi
                document.body.innerHTML = "<h1>Security violation detected. This incident has been logged.</h1>";
                
                // Atau redirect
                // window.location.href = "security-violation.html";
            }
        }, 2000);
            // Tambahkan ke script utama
        window.__securityCheck = true;
        window.__honeypot = "Do not modify this value";
        //honyepot variable
        setInterval(function() {
            if (window.__securityCheck !== true || window.__honeypot !== "Do not modify this value") {
                // Kode telah dimodifikasi
                document.body.innerHTML = "<h1>Security violation detected. This incident has been logged.</h1>";
                
                // Atau redirect
                // window.location.href = "security-violation.html";
            }
        }, 2000);
        