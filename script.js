/**
 * TAXLAB DIVINE EDITION - JavaScript Ultime
 * Auteur: Bichara Abakar Hangata 23B472FS
 * Encadreur: Ingénieur Samuel Kotva
 * 
 * Fonctions:
 * 1. calculerTaxe() - Calcule 17% de taxe en FCFA
 * 2. afficherDateDuJour() - Affiche la date formatée
 * 3. verifierPresence() - Vérifie présence dans array (booléen)
 */

// =============================================
// 1ère FONCTION: Calcul de taxe (17%) en FCFA
// =============================================
function calculerTaxe(prix) {
    const TAUX = 0.17;
    
    if (typeof prix !== 'number' || isNaN(prix) || prix < 0) {
        return { ht: 0, taxe: 0, total: 0 };
    }
    
    const taxe = prix * TAUX;
    const total = prix + taxe;
    
    // Arrondi pour FCFA (pas de centimes)
    return {
        ht: Math.round(prix),
        taxe: Math.round(taxe),
        total: Math.round(total)
    };
}

// =============================================
// 2ème FONCTION: Affichage date du jour
// =============================================
function afficherDateDuJour() {
    const maintenant = new Date();
    
    const optionsCompletes = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const optionsHeure = { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    };
    
    return {
        complete: maintenant.toLocaleDateString('fr-FR', optionsCompletes),
        heure: maintenant.toLocaleTimeString('fr-FR', optionsHeure),
        heureSimple: maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        jour: maintenant.getDate(),
        mois: maintenant.getMonth() + 1,
        annee: maintenant.getFullYear()
    };
}

// =============================================
// 3ème FONCTION: Vérification présence array
// =============================================
function verifierPresence(tableau, element) {
    const nombreRecherche = Number(element);
    
    if (isNaN(nombreRecherche) || !Number.isInteger(nombreRecherche)) {
        return {
            existe: false,
            message: 'Veuillez entrer un nombre entier valide',
            position: -1,
            valeur: element
        };
    }
    
    const existe = tableau.includes(nombreRecherche);
    const position = tableau.indexOf(nombreRecherche);
    
    return {
        existe: existe,
        message: existe 
            ? `✅ ${nombreRecherche} est présent dans le tableau` 
            : `❌ ${nombreRecherche} n'existe pas dans le tableau`,
        position: position,
        valeur: nombreRecherche
    };
}

// =============================================
// INITIALISATION DU DOM
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialiser AOS
    AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 100
    });
    
    // ----- CONSTANTES -----
    const ARRAY_REFERENCE = [12, 45, 7, 89, 23, 56, 34, 78, 91, 15];
    const NOM_ETUDIANT = 'Bichara Abakar Hangata';
    const MATRICULE = '23B472FS';
    const ENCADREUR = 'Ingénieur Samuel Kotva';
    
    // ----- PARTICULES CANVAS -----
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(88, 166, 255, ${p.opacity})`;
            ctx.fill();
        });
        
        // Connexions entre particules proches
        ctx.strokeStyle = 'rgba(88, 166, 255, 0.08)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    // ----- ÉLÉMENTS DOM -----
    // Calculateur
    const priceInput = document.getElementById('priceInput');
    const htValue = document.getElementById('htValue');
    const taxValue = document.getElementById('taxValue');
    const totalValue = document.getElementById('totalValue');
    const htBreakdown = document.getElementById('htBreakdown');
    const totalBreakdown = document.getElementById('totalBreakdown');
    const calculateBtn = document.getElementById('calculateTaxBtn');
    const clearPriceBtn = document.getElementById('clearPriceBtn');
    const quickBtns = document.querySelectorAll('.quick-btn-3d');
    
    // Dates
    const greetingMessage = document.querySelector('.greeting-text');
    const fullDateDisplay = document.getElementById('fullDateDisplay3D');
    const clockTime = document.querySelector('.clock-time');
    const clockDate = document.querySelector('.clock-date');
    
    // Vérificateur
    const arrayBubbles = document.getElementById('arrayBubbles');
    const arrayMin = document.getElementById('arrayMin');
    const arrayMax = document.getElementById('arrayMax');
    const arrayLength = document.getElementById('arrayLength');
    const searchInput = document.getElementById('searchInput');
    const verifyBtn = document.getElementById('verifyBtn');
    const verificationPanel = document.getElementById('verificationPanel');
    const panelIcon = document.getElementById('panelIcon');
    const verificationTitle = document.getElementById('verificationTitle');
    const verificationMessage = document.getElementById('verificationMessage');
    const verificationDetail = document.getElementById('verificationDetail');
    const randomSearchBtn = document.getElementById('randomSearchBtn');
    const resetSearchBtn = document.getElementById('resetSearchBtn');
    
    // Formulaire
    const completeForm = document.getElementById('completeForm');
    const formFeedback = document.getElementById('formFeedback3D');
    const fillDemoBtn = document.getElementById('fillDemoBtn');
    const rangeInput = document.getElementById('satisfaction');
    const rangeValue = document.getElementById('rangeValue3D');
    
    // Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu3D');
    const mobileClose = document.getElementById('mobileClose3D');
    const mobileOverlay = document.getElementById('mobileOverlay3D');
    
    // ----- FONCTIONS D'AFFICHAGE -----
    
    // Mise à jour date/heure
    function updateDateTime() {
        const dateObj = afficherDateDuJour();
        const heure = dateObj.heureSimple.split(':')[0];
        
        // Salutation
        let salutation = '';
        if (heure < 6) salutation = 'Bonne nuit';
        else if (heure < 12) salutation = 'Bonjour';
        else if (heure < 18) salutation = 'Bon après-midi';
        else salutation = 'Bonsoir';
        
        if (greetingMessage) {
            greetingMessage.textContent = `${salutation}, Bichara`;
        }
        
        if (fullDateDisplay) {
            fullDateDisplay.textContent = dateObj.complete;
        }
        
        if (clockTime) {
            clockTime.textContent = dateObj.heureSimple;
        }
        
        if (clockDate) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            clockDate.textContent = new Date().toLocaleDateString('fr-FR', options);
        }
    }
    
    // Initialisation array
    function initArrayDisplay() {
        arrayBubbles.innerHTML = '';
        ARRAY_REFERENCE.forEach((valeur, index) => {
            const bubble = document.createElement('div');
            bubble.className = 'array-bubble';
            bubble.textContent = valeur;
            bubble.style.animationDelay = `${index * 0.05}s`;
            bubble.addEventListener('click', () => {
                searchInput.value = valeur;
                performVerification();
                
                // Animation
                bubble.style.transform = 'scale(1.2)';
                setTimeout(() => bubble.style.transform = '', 200);
            });
            arrayBubbles.appendChild(bubble);
        });
        
        arrayMin.textContent = Math.min(...ARRAY_REFERENCE);
        arrayMax.textContent = Math.max(...ARRAY_REFERENCE);
        arrayLength.textContent = ARRAY_REFERENCE.length;
    }
    
    // Calcul taxe
    function performTaxCalculation() {
        const prix = parseFloat(priceInput.value);
        
        if (isNaN(prix) || prix < 0) {
            resetTaxDisplay();
            if (priceInput.value !== '') {
                priceInput.style.borderColor = 'var(--accent-pink)';
                setTimeout(() => priceInput.style.borderColor = '', 500);
            }
            return;
        }
        
        const resultat = calculerTaxe(prix);
        
        // Animation compteur
        animateValue(htValue, 0, resultat.ht, 500, 'FCFA');
        animateValue(taxValue, 0, resultat.taxe, 500, 'FCFA');
        animateValue(totalValue, 0, resultat.total, 500, 'FCFA');
        
        htBreakdown.textContent = resultat.ht.toLocaleString('fr-FR');
        totalBreakdown.textContent = resultat.total.toLocaleString('fr-FR');
    }
    
    function animateValue(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = `${Math.round(current).toLocaleString('fr-FR')} ${suffix}`;
        }, 16);
    }
    
    function resetTaxDisplay() {
        htValue.textContent = '0 FCFA';
        taxValue.textContent = '0 FCFA';
        totalValue.textContent = '0 FCFA';
        htBreakdown.textContent = '0';
        totalBreakdown.textContent = '0';
    }
    
    // Vérification array
    function performVerification() {
        const valeur = searchInput.value.trim();
        
        if (valeur === '') {
            updateVerificationUI('waiting', 'En attente', 'Entrez un nombre à vérifier', '');
            return;
        }
        
        const resultat = verifierPresence(ARRAY_REFERENCE, valeur);
        
        if (resultat.existe) {
            updateVerificationUI(
                'success',
                'Trouvé !',
                resultat.message,
                `Position: index ${resultat.position}`
            );
            
            // Highlight de la bulle
            document.querySelectorAll('.array-bubble').forEach((bubble, index) => {
                if (ARRAY_REFERENCE[index] === resultat.valeur) {
                    bubble.style.animation = 'none';
                    bubble.style.background = 'var(--gradient-2)';
                    bubble.style.transform = 'scale(1.15)';
                    setTimeout(() => {
                        bubble.style.background = '';
                        bubble.style.transform = '';
                        bubble.style.animation = '';
                    }, 2000);
                }
            });
        } else {
            updateVerificationUI(
                'error',
                'Non trouvé',
                resultat.message,
                `Le nombre ${resultat.valeur} n'est pas dans le tableau`
            );
        }
    }
    
    function updateVerificationUI(type, title, message, detail) {
        verificationPanel.className = 'verification-panel-3d';
        
        if (type === 'success') {
            verificationPanel.classList.add('success');
            panelIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else if (type === 'error') {
            verificationPanel.classList.add('error');
            panelIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        } else {
            panelIcon.innerHTML = '<i class="fas fa-question-circle"></i>';
        }
        
        verificationTitle.textContent = title;
        verificationMessage.textContent = message;
        verificationDetail.textContent = detail;
    }
    
    function performRandomSearch() {
        const randomValue = ARRAY_REFERENCE[Math.floor(Math.random() * ARRAY_REFERENCE.length)];
        searchInput.value = randomValue;
        performVerification();
    }
    
    function resetSearch() {
        searchInput.value = '';
        updateVerificationUI('waiting', 'En attente', 'Entrez un nombre à vérifier', '');
    }
    
    // Formulaire démo
    function fillDemoForm() {
        document.getElementById('fullName').value = NOM_ETUDIANT;
        document.getElementById('matricule').value = MATRICULE;
        document.getElementById('email').value = 'bichara.hangata@universite.td';
        document.getElementById('phone').value = '+23512345678';
        document.getElementById('specialite').value = 'Génie Logiciel';
        document.getElementById('comments').value = 'Design ultime réalisé avec HTML5, CSS3 et JavaScript. Toutes les fonctionnalités sont opérationnelles !';
        
        rangeInput.value = '9';
        rangeValue.textContent = '9';
        
        showFormFeedback('success', '✅ Formulaire rempli avec les données de démonstration');
    }
    
    function showFormFeedback(type, message) {
        formFeedback.className = `form-feedback-3d ${type}`;
        formFeedback.textContent = message;
        formFeedback.style.display = 'block';
        
        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 4000);
    }
    
    // Validation formulaire
    function validateForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        let isValid = true;
        const errors = [];
        
        if (!data.fullName || data.fullName.length < 3) {
            isValid = false;
            errors.push('Nom complet invalide (min. 3 caractères)');
        }
        
        if (!data.matricule || !/^[0-9]{2}[A-Z][0-9]{3}[A-Z]{2}$/.test(data.matricule)) {
            isValid = false;
            errors.push('Format matricule: 00X000XX');
        }
        
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            isValid = false;
            errors.push('Email invalide');
        }
        
        if (isValid) {
            showFormFeedback('success', `✅ Formulaire validé ! Merci ${data.fullName}`);
            console.log('📋 Données:', data);
        } else {
            showFormFeedback('error', `❌ ${errors.join(' • ')}`);
        }
    }
    
    // Mobile Menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ----- ÉVÉNEMENTS -----
    
    // Calculateur
    calculateBtn.addEventListener('click', performTaxCalculation);
    priceInput.addEventListener('keypress', e => { if (e.key === 'Enter') performTaxCalculation(); });
    priceInput.addEventListener('input', () => { if (priceInput.value === '') resetTaxDisplay(); });
    clearPriceBtn.addEventListener('click', () => { priceInput.value = ''; resetTaxDisplay(); priceInput.focus(); });
    
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            priceInput.value = btn.dataset.amount;
            performTaxCalculation();
        });
    });
    
    // Vérificateur
    verifyBtn.addEventListener('click', performVerification);
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') performVerification(); });
    randomSearchBtn.addEventListener('click', performRandomSearch);
    resetSearchBtn.addEventListener('click', resetSearch);
    
    // Formulaire
    completeForm.addEventListener('submit', validateForm);
    completeForm.addEventListener('reset', () => {
        formFeedback.style.display = 'none';
        rangeValue.textContent = '8';
    });
    fillDemoBtn.addEventListener('click', fillDemoForm);
    rangeInput.addEventListener('input', () => { rangeValue.textContent = rangeInput.value; });
    
    // Mobile Menu
    menuToggle.addEventListener('click', openMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // ----- INITIALISATION -----
    updateDateTime();
    setInterval(updateDateTime, 1000);
    initArrayDisplay();
    
    // Animation des cartes au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-3d').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s var(--transition-smooth)';
        observer.observe(section);
    });
    
    // Message console
    console.log('%c✨ TAXLAB DIVINE EDITION ✨', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #58a6ff, #bc8cff); color: white; padding: 8px 16px; border-radius: 8px;');
    console.log(`%c👨‍💻 ${NOM_ETUDIANT} (${MATRICULE})`, 'font-size: 14px; color: #58a6ff;');
    console.log(`%c👨‍🏫 Encadreur: ${ENCADREUR}`, 'font-size: 14px; color: #f7e05e;');
    console.log('%c🏆 Version Divine • Toutes les fonctionnalités sont opérationnelles !', 'font-size: 14px; color: #3fb950;');
    
}); // Fin DOMContentLoaded