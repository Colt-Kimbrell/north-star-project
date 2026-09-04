/* =========================================
   NORTH STAR PROJECT
   ARCHIVE RECOVERY SCRIPT
========================================= */


/* =========================================
   SECOND-VISIT STATE
========================================= */

const previousRecovery =
    localStorage.getItem(
        "northStarCompleted"
    ) === "true";


const previousIntegrity =
    localStorage.getItem(
        "northStarIntegrity"
    ) || "87";


const previousAttempt =
    localStorage.getItem(
        "northStarAttempt"
    ) || null;



/* =========================================
   PAGE ELEMENTS
========================================= */

const initializeButton =
    document.getElementById(
        "initialize-button"
    );

const introScreen =
    document.getElementById(
        "intro-screen"
    );

const recoveryInterface =
    document.getElementById(
        "recovery-interface"
    );


const restoreButton =
    document.getElementById(
        "restore-button"
    );

const cancelButton =
    document.getElementById(
        "cancel-button"
    );

const archiveButton =
    document.getElementById(
        "archive-button"
    );


const warningScreen =
    document.getElementById(
        "warning-screen"
    );

const recoveryScreen =
    document.getElementById(
        "recovery-screen"
    );

const completeScreen =
    document.getElementById(
        "complete-screen"
    );


const progressBar =
    document.getElementById(
        "progress-bar"
    );

const percentage =
    document.getElementById(
        "percentage"
    );

const fileStatus =
    document.getElementById(
        "file-status"
    );


const errorSound =
    document.getElementById(
        "error-sound"
    );



/* =========================================
   ALTER INTRO ON SECOND VISIT
========================================= */

if (previousRecovery) {

    const introSystem =
        document.querySelector(
            ".intro-system"
        );

    if (introSystem) {

        introSystem.insertAdjacentHTML(
            "beforeend",
            `
            <p>
                Previous Recovery Integrity:
                <strong>88%</strong>
            </p>

            <p>
                Previous Session:
                <strong>ATTEMPT 134</strong>
            </p>
            `
        );

    }

}



/* =========================================
   INITIALIZE ARCHIVE
========================================= */

initializeButton.addEventListener(
    "click",
    async () => {

        initializeButton.disabled = true;

        initializeButton.textContent =
            "Initializing...";

        await wait(700);

        introScreen.classList.add(
            "hidden"
        );

        recoveryInterface.classList.remove(
            "hidden"
        );

        playErrorSound();

    }
);



/* =========================================
   RECOVERY FILE SEQUENCE
========================================= */

let recoveryFiles = [

    {
        name: "index.htm",
        type: "normal"
    },

    {
        name: "project_manifest.dat",
        type: "normal"
    },

    {
        name: "observations_1974.log",
        type: "normal"
    },

    {
        name: "personnel_records.db",
        type: "normal"
    },

    {
        name: "audio_reel_07.wav",
        type: "normal"
    },

    {
        name: "NSP_74_048.dat",
        type: "normal"
    },

    {
        name: "████████████.dat",
        type: "redacted"
    },

    {
        name: "[REDACTED].txt",
        type: "redacted"
    },

    {
        name: "NSP_74_0▒8.img",
        type: "corrupt"
    },

    {
        name: "⍜⋮⌇⟟_02.dat",
        type: "unknown"
    },

    {
        name: "unknown_02.jpg",
        type: "normal"
    },

    {
        name: "do_not_restore.txt",
        type: "warning"
    }

];



/* =========================================
   SECOND-VISIT FILE
========================================= */

if (previousRecovery) {

    recoveryFiles.push({

        name: "attempt_134.log",
        type: "previous"

    });

}



/* =========================================
   RESTORE BUTTON
========================================= */

restoreButton.addEventListener(
    "click",
    async () => {

        restoreButton.disabled = true;
        cancelButton.disabled = true;

        warningScreen.classList.add(
            "hidden"
        );

        recoveryScreen.classList.remove(
            "hidden"
        );

        progressBar.style.width =
            "0%";

        percentage.textContent =
            "0%";

        fileStatus.innerHTML =
            "Initializing recovery utility...";

        await wait(900);


        let progress = 0;


        for (
            let i = 0;
            i < recoveryFiles.length;
            i++
        ) {

            const file =
                recoveryFiles[i];


            fileStatus.innerHTML =
                `Recovering: <strong>${file.name}</strong>`;

            fileStatus.className = "";

            await wait(
                randomTime(400, 850)
            );


            /* =================================
               UNKNOWN SYMBOL FILE
            ================================= */

            if (file.type === "unknown") {

                progress = 87;

                updateProgress(progress);

                fileStatus.innerHTML =
                    `Recovering: <strong>${file.name}</strong>`;

                await wait(1200);

                fileStatus.innerHTML =
                    `
                    <span class="recovery-error">
                        FILE HEADER INVALID
                    </span>
                    `;

                await wait(1000);

                fileStatus.innerHTML =
                    `
                    <span class="recovery-error">
                        ATTEMPTING RECOVERY...
                    </span>
                    `;

                await wait(1700);

                fileStatus.innerHTML =
                    `
                    <span class="recovery-success">
                        FILE RECOVERED
                    </span>
                    `;

                await wait(900);

                continue;

            }


            /* =================================
               CORRUPT IMAGE
            ================================= */

            if (file.type === "corrupt") {

                fileStatus.innerHTML =
                    `Recovering: <strong>${file.name}</strong>`;

                await wait(600);

                fileStatus.innerHTML =
                    `
                    <span class="recovery-warning">
                        DATA DAMAGE DETECTED
                    </span>
                    `;

                await wait(700);

            }


            /* =================================
               REDACTED FILE
            ================================= */

            if (file.type === "redacted") {

                fileStatus.innerHTML =
                    `Recovering: <strong>${file.name}</strong>`;

                await wait(700);

            }


            /* =================================
               DO NOT RESTORE
            ================================= */

            if (file.type === "warning") {

                progress = 97;

                updateProgress(progress);

                fileStatus.innerHTML =
                    `Recovering: <strong>${file.name}</strong>`;

                await wait(1600);

                fileStatus.innerHTML =
                    `
                    <span class="recovery-warning">
                        FILE RECOVERED
                    </span>
                    `;

                await wait(900);

                continue;

            }


            /* =================================
               SECOND VISIT FILE
            ================================= */

            if (file.type === "previous") {

                progress = 98;

                updateProgress(progress);

                fileStatus.innerHTML =
                    `Recovering: <strong>${file.name}</strong>`;

                await wait(1200);

                fileStatus.innerHTML =
                    `
                    <span class="recovery-warning">
                        PREVIOUS SESSION DETECTED
                    </span>
                    `;

                await wait(1300);

                fileStatus.innerHTML =
                    `
                    <span class="recovery-error">
                        OBSERVER RECORD FOUND
                    </span>
                    `;

                await wait(1500);

                continue;

            }


            /* =================================
               NORMAL PROGRESS
            ================================= */

            if (progress < 87) {

                progress +=
                    randomNumber(5, 10);

                if (progress > 84) {

                    progress = 84;

                }

            }

            else if (progress < 97) {

                progress += 2;

            }


            updateProgress(progress);

        }



        /* =========================================
           FINALIZE
        ========================================== */

        fileStatus.innerHTML =
            "Finalizing recovered archive...";

        await wait(1000);

        updateProgress(100);

        await wait(700);

        recoveryScreen.classList.add(
            "hidden"
        );

        completeScreen.classList.remove(
            "hidden"
        );



        /* =========================================
           SECOND VISIT COMPLETE MESSAGE
        ========================================== */

        if (previousRecovery) {

            const completeParagraph =
                completeScreen.querySelector(
                    "p"
                );

            if (completeParagraph) {

                completeParagraph.textContent =
                    "88% of archive successfully restored.";

            }

        }

    }
);



/* =========================================
   CANCEL BUTTON
========================================= */

cancelButton.addEventListener(
    "click",
    async () => {

        cancelButton.disabled = true;

        cancelButton.textContent =
            "Canceling...";

        await wait(800);

        cancelButton.textContent =
            "Unable to Cancel";

        playErrorSound();

        await wait(1400);

        cancelButton.disabled = false;

        cancelButton.textContent =
            "Cancel";

    }
);



/* =========================================
   VIEW ARCHIVE
========================================= */

archiveButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "archive.html";

    }
);



/* =========================================
   SOUND HELPER
========================================= */

function playErrorSound() {

    if (!errorSound) {
        return;
    }

    errorSound.pause();

    errorSound.currentTime = 0;

    const playAttempt =
        errorSound.play();

    if (
        playAttempt !== undefined
    ) {

        playAttempt.catch(
            () => {}
        );

    }

}



/* =========================================
   PROGRESS HELPER
========================================= */

function updateProgress(value) {

    progressBar.style.width =
        value + "%";

    percentage.textContent =
        value + "%";

}



/* =========================================
   TIMING HELPERS
========================================= */

function wait(milliseconds) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


function randomTime(min, max) {

    return randomNumber(
        min,
        max
    );

}