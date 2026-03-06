let notes = loadNotes();
let currentSort = "newest";

function loadNotes() {
    const raw = JSON.parse(localStorage.getItem("notes")) || [];
    return raw.map((n) =>
        typeof n === "string"
            ? { text: n, createdAt: new Date().toISOString() }
            : n
    );
}

// Helpers
function escapeHTML(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

/* Format note text from "- " to "• "*/
function formatNoteDisplay(text) {
    const escaped = escapeHTML(text);
    const bulleted = escaped
        .split("\n")
        .map((line) =>
            line.startsWith("- ") ? "• " + line.slice(2) : line
        )
        .join("<br>");
    return bulleted;
}

// Sorting
function getSortedIndices() {
    const indices = notes.map((_, i) => i);

    switch (currentSort) {
        case "az":
            indices.sort((a, b) =>
                notes[a].text.localeCompare(notes[b].text, undefined, { sensitivity: "base" })
            );
            break;
        case "za":
            indices.sort((a, b) =>
                notes[b].text.localeCompare(notes[a].text, undefined, { sensitivity: "base" })
            );
            break;
        case "oldest":
            indices.sort(
                (a, b) => new Date(notes[a].createdAt) - new Date(notes[b].createdAt)
            );
            break;
        case "newest":
        default:
            indices.sort(
                (a, b) => new Date(notes[b].createdAt) - new Date(notes[a].createdAt)
            );
            break;
    }
    return indices;
}

function changeSort(value) {
    currentSort = value;
    renderNotes();
}

// Render notes
function renderNotes() {
    const container = document.getElementById("notes-container");
    if (!container) return;

    if (notes.length === 0) {
        container.innerHTML = "<p>No notes saved yet.</p>";
        return;
    }

    const sortedIndices = getSortedIndices();

    const rows = sortedIndices
        .map(
            (origIdx, displayNum) => `
            <tr>
                <td>${displayNum + 1}</td>
                <td>${formatNoteDisplay(notes[origIdx].text)}</td>
            </tr>`
        )
        .join("");

    container.innerHTML = `
        <table class="notes-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function initSortControl() {
    const sortSelect = document.getElementById("sort-notes");
    if (!sortSelect) return;

    sortSelect.addEventListener("change", (e) => {
        changeSort(e.target.value);
    });
}

// Boot
document.addEventListener("DOMContentLoaded", () => {
    initSortControl();
    renderNotes();
});