document.addEventListener("DOMContentLoaded", () => {
    const savedPrenom = localStorage.getItem('coranAppUserPrenom');
    if (savedPrenom) {
        document.getElementById('userNameDisplay').textContent = savedPrenom;
    }
});

function afficherVueLecons() {
    document.getElementById('root').style.display = 'none';
    document.getElementById('lessonDetailView').style.display = 'none';
    document.getElementById('lessonsView').style.display = 'block';
    window.scrollTo(0, 0);
}

function fermerVueLecons() {
    document.getElementById('lessonsView').style.display = 'none';
    document.getElementById('root').style.display = 'block';
    window.scrollTo(0, 0);
}

function ouvrirDetailLecon() {
    document.getElementById('lessonsView').style.display = 'none';
    document.getElementById('lessonDetailView').style.display = 'block';
    window.scrollTo(0, 0);
}

function retourListeLecons() {
    document.getElementById('lessonDetailView').style.display = 'none';
    document.getElementById('lessonsView').style.display = 'block';
    window.scrollTo(0, 0);
}

// Fonction pour défiler automatiquement vers la lettre ciblée en bas
function allerALaLettre(idLettre) {
    changerSousOnglet('table');
    const element = document.getElementById(idLettre);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Fonction pour basculer entre les onglets principaux (Leçon / Écouter / Exercice)
function changerOnglet(onglet) {
    const tabLesson = document.getElementById('tabLesson');
    const tabListen = document.getElementById('tabListen');
    const tabExercise = document.getElementById('tabExercise');

    const contentLesson = document.getElementById('contentLesson');
    const contentListen = document.getElementById('contentListen');
    const contentExercise = document.getElementById('contentExercise');

    tabLesson.className = "flex-1 flex items-center justify-center gap-2 text-white/80 hover:text-white font-bold text-sm py-2.5 rounded-xl cursor-pointer transition-all";
    tabListen.className = "flex-1 flex items-center justify-center gap-2 text-white/80 hover:text-white font-bold text-sm py-2.5 rounded-xl cursor-pointer transition-all";
    tabExercise.className = "flex-1 flex items-center justify-center gap-2 text-white/80 hover:text-white font-bold text-sm py-2.5 rounded-xl cursor-pointer transition-all";

    contentLesson.style.display = 'none';
    contentListen.style.display = 'none';
    contentExercise.style.display = 'none';

    if (onglet === 'lesson') {
        tabLesson.className = "flex-1 flex items-center justify-center gap-2 bg-white text-[#064e3b] font-black text-sm py-2.5 rounded-xl shadow cursor-pointer transition-all";
        contentLesson.style.display = 'block';
    } else if (onglet === 'listen') {
        tabListen.className = "flex-1 flex items-center justify-center gap-2 bg-white text-[#064e3b] font-black text-sm py-2.5 rounded-xl shadow cursor-pointer transition-all";
        contentListen.style.display = 'block';
    } else if (onglet === 'exercise') {
        tabExercise.className = "flex-1 flex items-center justify-center gap-2 bg-white text-[#064e3b] font-black text-sm py-2.5 rounded-xl shadow cursor-pointer transition-all";
        contentExercise.style.display = 'block';
    }

    window.scrollTo(0, 0);
}

// Fonction pour basculer entre les sous-onglets en bas (Tableau / Quiz / Assemblage)
function changerSousOnglet(sousOnglet) {
    const subTabTable = document.getElementById('subTabTable');
    const subTabQuiz = document.getElementById('subTabQuiz');
    const subTabAssemble = document.getElementById('subTabAssemble');

    const subContentTable = document.getElementById('subContentTable');
    const subContentQuiz = document.getElementById('subContentQuiz');
    const subContentAssemble = document.getElementById('subContentAssemble');

    subTabTable.className = "flex-1 flex items-center justify-center gap-2 text-white/85 hover:text-white font-bold text-xs py-2 rounded-xl cursor-pointer transition-all";
    subTabQuiz.className = "flex-1 flex items-center justify-center gap-2 text-white/85 hover:text-white font-bold text-xs py-2 rounded-xl cursor-pointer transition-all";
    subTabAssemble.className = "flex-1 flex items-center justify-center gap-2 text-white/85 hover:text-white font-bold text-xs py-2 rounded-xl cursor-pointer transition-all";

    subContentTable.style.display = 'none';
    subContentQuiz.style.display = 'none';
    subContentAssemble.style.display = 'none';

    if (sousOnglet === 'table') {
        subTabTable.className = "flex-1 flex items-center justify-center gap-2 bg-white text-[#064e3b] font-black text-xs py-2 rounded-xl shadow cursor-pointer transition-all";
        subContentTable.style.display = 'block';
    } else if (sousOnglet === 'quiz') {
        subTabQuiz.className = "flex-1 flex items-center justify-center gap-2 bg-white text-[#064e3b] font-black text-xs py-2 rounded-xl shadow cursor-pointer transition-all";
        subContentQuiz.style.display = 'block';
    } else if (sousOnglet === 'assemble') {
        subTabAssemble.className = "flex-1 flex items-center justify-center gap-2 bg-white text-[#064e3b] font-black text-xs py-2 rounded-xl shadow cursor-pointer transition-all";
        subContentAssemble.style.display = 'block';
    }
}