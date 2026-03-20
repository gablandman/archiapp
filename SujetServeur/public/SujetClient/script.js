// exo 3.1

function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}

function applique(f, tab) {
    var result = [];
    for (var i = 0; i < tab.length; i++) {
        result.push(f(tab[i]));
    }
    return result;
}

console.log(fact(6));
console.log(applique(fact, [1, 2, 3, 4, 5, 6]));
console.log(applique(function(n) { return n + 1; }, [1, 2, 3, 4, 5, 6]));

// exo 3.2 + 3.3

var msgs = [
    { pseudo: "Alice",   msg: "Premier message de test",  date: "2026-03-20 09:00" },
    { pseudo: "Bob",     msg: "Deuxième message",         date: "2026-03-20 09:15" },
    { pseudo: "Charlie", msg: "Troisième message",        date: "2026-03-20 10:30" },
    { pseudo: "Diana",   msg: "Quatrième message",        date: "2026-03-20 11:00" },
    { pseudo: "Eve",     msg: "Cinquième message",        date: "2026-03-20 12:00" }
];

function update(tab) {
    var list = document.getElementById("message-list");
    list.innerHTML = "";
    for (var i = 0; i < tab.length; i++) {
        var li = document.createElement("li");

        var dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = tab[i].date || "";

        var pseudoSpan = document.createElement("span");
        pseudoSpan.className = "pseudo";
        pseudoSpan.textContent = tab[i].pseudo || "Anonyme";

        var msgSpan = document.createElement("span");
        msgSpan.className = "msg-text";
        msgSpan.textContent = tab[i].msg;

        li.appendChild(dateSpan);
        li.appendChild(pseudoSpan);
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(msgSpan);
        list.appendChild(li);
    }
}

update(msgs);

// bouton envoyer
document.getElementById("send-btn").addEventListener("click", function() {
    var pseudo = document.getElementById("pseudo-input").value.trim();
    var text = document.getElementById("message-input").value.trim();
    if (text === "") return;

    var now = new Date();
    var dateStr = now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + " " +
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");

    msgs.push({ pseudo: pseudo || "Anonyme", msg: text, date: dateStr });
    document.getElementById("message-input").value = "";
    update(msgs);
});

// bouton mise a jour
document.getElementById("update-btn").addEventListener("click", function() {
    update(msgs);
});

// bouton theme
document.getElementById("theme-btn").addEventListener("click", function() {
    document.body.classList.toggle("dark");
});
