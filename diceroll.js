                    let rollHistory = []; //AI artifact initially was history, but called everywhere else as rollHistory
                    // Rolls X number of Y-sided dice and applies an optional modifier to the total
                    function rollDice(sides) {
                        let numDice = parseInt(document.getElementById("numDice").value) || 1;
                        let mod = parseInt(document.getElementById("modifier").value) || 0;
                        //AI artifact, was trying to getElementById("diceType") when it didn't exist making ``sides`` become NaN

                        // validate numDice
                        if (isNaN(numDice) || numDice < 1) numDice = 1;
                        if (numDice > 20) numDice = 20;

                        // validate modifier
                        if (isNaN(mod)) mod = 0;
                        if (mod > 100) mod = 100;
                        if (mod < -100) mod = -100;

                        let rolls = [];
                        let total = 0; 

                        // Roll multiple dice
                        for (let i = 0; i < numDice; i++) {
                            let roll = Math.floor(Math.random() * sides) + 1;
                            rolls.push(roll);
                            total += roll;

                            //Critcal Hit!
                            if (sides == 20 && roll == 20){
                                rolls[i] = "20 🎯 CRIT";
                            }
                            if (sides == 20 && roll == 1){
                                rolls[i] = "1 💀 FUMBLE";
                            }
                        }

                        total += mod;
                        let resultText = `${numDice}d${sides}: [${rolls.join(", ")}] + ${mod} = ${total}`;
                        // Display result
                        document.getElementById("result").textContent = resultText;
                        
                        //store history
                        rollHistory.unshift(resultText);
                        updateHistory();
                    }

                    function updateHistory(){
                        let historyList = document.getElementById("history");
                        historyList.innerHTML = "";

                        for(let i = 0; i < rollHistory.length; i++){
                            let li = document.createElement("li");
                            li.textContent = rollHistory[i];
                            historyList.appendChild(li);
                            if (rollHistory.length > 10) {
                                rollHistory.pop();
                            }
                        }
                    }
                    function clearHistory(){
                        rollHistory = [];
                        updateHistory();
                    }