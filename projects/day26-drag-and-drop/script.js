const lists = document.getElementsByClassName("list");
const rightBox = document.getElementById("right");
const leftBox = document.getElementById("left");

let selected = null;

// Register dragstart on each list item once
for (const list of lists) {
    list.addEventListener("dragstart", (e) => {
        selected = e.target;
    });
}

// Register drop zones once — no stacking listeners
[rightBox, leftBox].forEach(box => {
    box.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    box.addEventListener("drop", () => {
        if (selected) {
            box.appendChild(selected);
            selected = null;
        }
    });
});
