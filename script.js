/* ==========================================
   1. CONFIGURATION FIREBASE (CoranApp)
   ========================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Configuration du nouveau projet CoranApp
const firebaseConfig = {
  apiKey: "AIzaSyCI1EvReDKHJBJbHKWNsTCWhKR1PmdvBus",
  authDomain: "coranapp-d990a.firebaseapp.com",
  projectId: "coranapp-d990a",
  storageBucket: "coranapp-d990a.firebasestorage.app",
  messagingSenderId: "677078059889",
  appId: "1:677078059889:web:d4c45d6ce8d04be1e304d0",
  measurementId: "G-RZDFFB1QG"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


/* ==========================================
   2. GESTION DU THÈME SOMBRE
   ========================================== */
function basculerTheme() {
    const htmlTag = document.documentElement;
    const btn = document.getElementById("themeToggleBtn");

    if (htmlTag.getAttribute("data-theme") === "dark") {
        htmlTag.removeAttribute("data-theme");
        localStorage.setItem("themeCoran", "light");
        btn.innerHTML = "🌙 Sombre";
    } else {
        htmlTag.setAttribute("data-theme", "dark");
        localStorage.setItem("themeCoran", "dark");
        btn.innerHTML = "☀️ Clair";
    }
}
// Rendre la fonction accessible globalement dans le HTML
window.basculerTheme = basculerTheme;


/* ==========================================
   3. GESTION DU PROFIL UTILISATEUR
   ========================================== */
function enregistrerProfil() {
    const prenom = document.getElementById("userPrenom").value.trim();
    const nom = document.getElementById("userNom").value.trim();
    if (!prenom) { alert("Veuillez entrer votre prénom."); return; }
    localStorage.setItem("coranUserPrenom", prenom);
    if (nom) localStorage.setItem("coranUserNom", nom);
    document.getElementById("dashUserPrenom").textContent = prenom;
    document.getElementById("onboardingModal").style.display = "none";
}
window.enregistrerProfil = enregistrerProfil;


/* ==========================================
   4. PARTAGE ET COPIE
   ========================================== */
function copierAyah() {
    navigator.clipboard.writeText("Al-Israa · v.28\n« Si tu t'écartes d'eux à la recherche d'une miséricorde de Ton Seigneur... »");
    alert("Verset copié !");
}
window.copierAyah = copierAyah;

function copierLienApp() {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien de l'application copié !");
}
window.copierLienApp = copierLienApp;

function partagerWhatsApp() {
    const texte = encodeURIComponent("Salam ! Viens apprendre le Coran facilement pas à pas avec l'application Apprendre le Coran : " + window.location.href);
    window.open("https://wa.me/?text=" + texte, "_blank");
}
window.partagerWhatsApp = partagerWhatsApp;


/* ==========================================
   5. GESTION DES LEÇONS ET AUDIO
   ========================================== */
function ouvrirLecon(num, titre, exemples) {
    document.getElementById("modalLeconTitre").textContent = `Leçon ${num} : ${titre}`;
    const grid = document.getElementById("modalAudioGrid");
    grid.innerHTML = "";

    exemples.forEach(ex => {
        const item = document.createElement("div");
        item.className = "audio-item";
        item.innerHTML = `
            <div class="audio-item-left">
                <span class="arabe">${ex.arabe}</span>
                <div>
                    <div class="phonetique">${ex.phonetique}</div>
                    <div class="audio-conseil">💡 ${ex.conseil}</div>
                </div>
            </div>
            <button class="btn-play-audio">▶</button>
        `;
        item.onclick = () => jouerAudioProfesseur(ex.audio, ex.arabe);
        grid.appendChild(item);
    });
    document.getElementById("audioModal").style.display = "flex";
}
window.ouvrirLecon = ouvrirLecon;

function fermerLecon() { 
    document.getElementById("audioModal").style.display = "none"; 
}
window.fermerLecon = fermerLecon;

function jouerAudioProfesseur(cheminAudio, texteArabeSecours) {
    const audio = new Audio(cheminAudio);
    audio.play().catch(() => {
        if ('speechSynthesis' in window) {
            const utt = new SpeechSynthesisUtterance(texteArabeSecours);
            utt.lang = 'ar-SA'; utt.rate = 0.8;
            window.speechSynthesis.speak(utt);
        } else { 
            alert("Fichier audio introuvable : " + cheminAudio); 
        }
    });
}
window.jouerAudioProfesseur = jouerAudioProfesseur;


/* ==========================================
   6. GESTION DU QUIZ (ÉTAPE 3)
   ========================================== */
const questionsQuiz = [
    { question: "Quelle est la prononciation correcte de la lettre أَ ?", options: ["Alif (A)", "Ba (B)", "Ta (T)"], correct: 0 },
    { question: "Où doit-on placer la langue pour prononcer la lettre تَ ?", options: ["Sur les lèvres", "Contre les incisives supérieures", "Au fond de la gorge"], correct: 1 },
    { question: "Que signifie le Tanween أً ?", options: ["Un son court", "Un double fatha (son An)", "Une pause"], correct: 1 }
];

let questionActuelleIndex = 0;
let scoreQuiz = 0;

function lancerQuiz() {
    fermerLecon();
    questionActuelleIndex = 0;
    scoreQuiz = 0;
    document.getElementById("quizModal").style.display = "flex";
    afficherQuestion();
}
window.lancerQuiz = lancerQuiz;

function afficherQuestion() {
    const q = questionsQuiz[questionActuelleIndex];
    document.getElementById("quizQuestion").textContent = `Question ${questionActuelleIndex + 1} / ${questionsQuiz.length} : ${q.question}`;
    
    const optionsDiv = document.getElementById("quizOptions");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-btn";
        btn.textContent = opt;
        btn.onclick = () => verifierReponse(index, q.correct);
        optionsDiv.appendChild(btn);
    });

    document.getElementById("quizScore").textContent = `Score actuel : ${scoreQuiz} / ${questionsQuiz.length}`;
}

function verifierReponse(choix, correct) {
    if (choix === correct) {
        scoreQuiz++;
        alert("✅ Bonne réponse ! Masha'Allah.");
    } else {
        alert("❌ Mauvaise réponse. Continue tes efforts !");
    }

    questionActuelleIndex++;
    if (questionActuelleIndex < questionsQuiz.length) {
        afficherQuestion();
    } else {
        document.getElementById("quizQuestion").textContent = `🎉 Quiz terminé ! Score final : ${scoreQuiz} / ${questionsQuiz.length}`;
        document.getElementById("quizOptions").innerHTML = `<button class="btn-continue" onclick="fermerQuiz()">Terminer le test ✅</button>`;
    }
}

function fermerQuiz() {
    document.getElementById("quizModal").style.display = "none";
}
window.fermerQuiz = fermerQuiz;


/* ==========================================
   7. GESTION DE L'OFFRE PREMIUM (2000 FCFA)
   ========================================== */
function ouvrirModalPremium() { 
    document.getElementById("premiumModal").style.display = "flex"; 
}
window.ouvrirModalPremium = ouvrirModalPremium;

function fermerModalPremium() { 
    document.getElementById("premiumModal").style.display = "none"; 
}
window.fermerModalPremium = fermerModalPremium;

function verifierAccesLecon(num, titre) {
    if (localStorage.getItem("coranEstPremium") === "true") {
        ouvrirLecon(num, titre, [
            {arabe: 'نْ أ', phonetique: 'Exemple Noon', conseil: 'Garder la langue collée au palais', audio: 'audio/noon.mp3'}
        ]);
    } else { 
        ouvrirModalPremium(); 
    }
}
window.verifierAccesLecon = verifierAccesLecon;

function validerCodePremium() {
    const code = document.getElementById("inputCodeSecret").value.trim();
    if (code === "2026" || code === "1234") {
        localStorage.setItem("coranEstPremium", "true");
        alert("🎉 Compte Premium activé à vie !");
        fermerModalPremium();
        mettreAJourInterfacePremium();
    } else { 
        alert("Code incorrect."); 
    }
}
window.validerCardPremium = validerCodePremium; // Sécurité de nommage
window.validerCodePremium = validerCodePremium;

function mettreAJourInterfacePremium() {
    if (localStorage.getItem("coranEstPremium") === "true") {
        document.querySelectorAll(".leçon-card.locked").forEach(card => {
            card.classList.remove("locked");
            card.querySelector(".badge-lock").textContent = "🔓";
        });
        document.getElementById("statutLecons").textContent = "Leçons Débloquées 🌟";
    }
}


/* ==========================================
   8. INITIALISATION AU CHARGEMENT DE LA PAGE
   ========================================== */
window.addEventListener("DOMContentLoaded", () => {
    // Restauration du thème
    const savedTheme = localStorage.getItem("themeCoran");
    const btnTheme = document.getElementById("themeToggleBtn");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (btnTheme) btnTheme.innerHTML = "☀️ Clair";
    }

    // Restauration du profil utilisateur
    const prenom = localStorage.getItem("coranUserPrenom");
    if (prenom) {
        document.getElementById("dashUserPrenom").textContent = prenom;
        document.getElementById("onboardingModal").style.display = "none";
    }
    
    // Vérification du statut Premium persistant
    mettreAJourInterfacePremium();
});