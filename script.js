// --- Firebase Setup ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "YOUR_AUTH_DOMAIN",
   projectId: "YOUR_PROJECT_ID",
   storageBucket: "YOUR_BUCKET",
   messagingSenderId: "YOUR_MSG_ID",
   appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// --- End Firebase Setup ---
async function saveRegistration(data) {
    try {
        await addDoc(collection(db, "registrations"), data);
        regMsg.textContent = "Registration successful!";
    } catch (e) {
        console.error("Error adding document: ", e);
        regMsg.textContent = "Error saving registration!";
    }
}
// set current year
document.getElementById('year').innerText = new Date().getFullYear();

// Dark mode toggle (persist using localStorage)
const darkBtn = document.getElementById('darkToggle');
const prefersDark = localStorage.getItem('kgr_dark') === 'true';

function applyDark(d){
  if(d){
    document.documentElement.style.setProperty('--purple-1','#2b076e');
    document.documentElement.style.setProperty('--purple-2','#5b21b6');
    document.documentElement.style.setProperty('--gold-1','#f59e0b');
    document.body.classList.add('dark');
    darkBtn.innerText = '☀️';
    darkBtn.setAttribute('aria-pressed','true');
  } else {
    document.body.classList.remove('dark');
    darkBtn.innerText = '🌙';
    darkBtn.setAttribute('aria-pressed','false');
  }
}
applyDark(prefersDark);

darkBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  localStorage.setItem('kgr_dark', String(isDark));
  applyDark(isDark);
});

// registration simple handler (localStorage)
const regForm = document.getElementById('regForm');
const regMsg = document.getElementById('regMsg');

regForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: regForm.name.value.trim(),
        dept: regForm.dept.value.trim(),
        email: regForm.email.value.trim(),
        event: regForm.event.value,
        time: new Date().toISOString()
    };

    if (!data.name || !data.email || !data.event) {
        regMsg.textContent = 'Please fill required fields.';
        return;
    }

    const success = await saveRegistration(data);

    if (success) {
        regMsg.textContent = 'Registration successful ✔';
        regForm.reset();
        setTimeout(() => regMsg.textContent = '', 4000);
    } else {
        regMsg.textContent = 'Error saving registration ❌';
    }
});
  }
  // store in localStorage (simple)
  const saved = JSON.parse(localStorage.getItem('kgr_registrations') || '[]');
  saved.push({ ...data, time: new Date().toISOString() });
  localStorage.setItem('kgr_registrations', JSON.stringify(saved));
  regMsg.textContent = 'Registration successful — saved locally.';
  regForm.reset();
  setTimeout(()=> regMsg.textContent = '', 4000);
});
