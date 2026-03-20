// exo 3.1 - url du serveur

function getServerUrl() {
    var url = document.getElementById("server-url").value.trim();
    if (url === "") return "";
    // enlever le / final si present
    if (url.endsWith("/")) url = url.slice(0, -1);
    return url;
}

// exo 3.2 - charger tous les messages au demarrage

function loadMessages() {
    var url = getServerUrl();
    fetch(url + "/msg/getAll")
        .then(function(response) { return response.json(); })
        .then(function(data) {
            var list = document.getElementById("message-list");
            list.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("li");

                var pseudoSpan = document.createElement("span");
                pseudoSpan.className = "pseudo";
                // le pseudo est stocke au debut du message sous la forme [pseudo]
                var msg = data[i].msg;
                var pseudo = "Anonyme";
                if (msg.charAt(0) === "[") {
                    var end = msg.indexOf("]");
                    if (end > 0) {
                        pseudo = msg.substring(1, end);
                        msg = msg.substring(end + 1).trim();
                    }
                }
                pseudoSpan.textContent = pseudo;

                var msgSpan = document.createElement("span");
                msgSpan.className = "msg-text";
                msgSpan.textContent = msg;

                li.appendChild(pseudoSpan);
                li.appendChild(document.createTextNode(" - "));
                li.appendChild(msgSpan);
                list.appendChild(li);
            }
        })
        .catch(function(err) {
            console.log("erreur chargement:", err);
        });
}

// exo 3.3 - envoyer un message

document.getElementById("send-btn").addEventListener("click", function() {
    var pseudo = document.getElementById("pseudo-input").value.trim() || "Anonyme";
    var text = document.getElementById("message-input").value.trim();
    if (text === "") return;

    var url = getServerUrl();
    var fullMsg = "[" + pseudo + "] " + text;

    fetch(url + "/msg/post/" + encodeURIComponent(fullMsg))
        .then(function(response) { return response.json(); })
        .then(function(data) {
            document.getElementById("message-input").value = "";
            loadMessages();
        })
        .catch(function(err) {
            console.log("erreur envoi:", err);
        });
});

// bouton mise a jour
document.getElementById("update-btn").addEventListener("click", function() {
    loadMessages();
});

// bouton theme
document.getElementById("theme-btn").addEventListener("click", function() {
    document.body.classList.toggle("dark");
});

// exo 3.2 - charger au demarrage
// on met l'url du serveur courant par defaut
document.getElementById("server-url").value = window.location.origin;
loadMessages();
