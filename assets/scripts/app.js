const ATTACK_VALUE = 10;
const STRONG_ATTACK = 15;
const HEALING_UP = 20;
const MONSTER_ATTACK_VALUE = 12;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PALYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let lastloggedEntry;
let battleLog = [];

function getMaxLifeValue() {
  const usersValue = prompt("Maximum life for you and monster", "value");
  const parsedValue = parseInt(usersValue);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw "This is not a number. Please enter a valid number"; //throwing a error for user using throw keyword.
  }

  return parsedValue;
}

let chosenMaxlife;

try {
  chosenMaxlife = getMaxLifeValue();
} catch (error) {
  console.log(error);
  chosenMaxlife = 100;
  alert("You have take invalid input the input is set to 100");
} finally {
}

let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
let hasbonuslife = true;

let logEntry;
adjustHealthBars(chosenMaxlife);

function writetoLog(ev, val, monsterHealth, playerHealth) {
  //creating function

  // switch (ev){                                              //creating switch case
  //   case  LOG_EVENT_PLAYER_ATTACK
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: "MONSTER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  //   break;

  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      //creating object
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  battleLog.push(logEntry); //adding the new element with array
}

function reset() {
  currentMonsterHealth = chosenMaxlife;
  currentPlayerHealth = chosenMaxlife;
  resetGame(chosenMaxlife);
}

function endround() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writetoLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasbonuslife) {
    hasbonuslife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You have a bonus life");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won bro");
    writetoLog(
      LOG_EVENT_GAME_OVER,
      "Player Won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lose");
    writetoLog(
      LOG_EVENT_GAME_OVER,
      "Monster Won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("OOOOOh Its a draw");
    writetoLog(
      LOG_EVENT_GAME_OVER,
      "oooh its a tie",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset(); //calling reset function
  }
}

function attackMonster(mode) {
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK; // using ternary operator to reduce lines of code
  let logEvent =
    mode === MODE_ATTACK //ternay operator are expression. Expression meaning we can use something on right side of=
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  /*if (mode === MODE_ATTACK) {                          //if else condition are statements 
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }*/

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writetoLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endround();
}

function attackhandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healingHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxlife - HEALING_UP) {
    alert("You have boosted your maximinum healing");
    healValue = chosenMaxlife - currentPlayerHealth;
  } else {
    healValue = HEALING_UP;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

  writetoLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endround();
}

function findDuplicatesInArr() {
  let arr = [1, 2, 3, 4, 5, 7, 6, 8, 9, 10, 12, 14, 15, 14, 8];
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    let shouldBreak = false;
    for (let j = i + 1; j < arr.length; j++) {
      counter++;
      if (arr[i] === arr[j]) {
        console.log("found match ", arr[i]);
        shouldBreak = true;
        break;
      }
    }
    if (shouldBreak) {
      break;
    }
  }
  console.log("Number of comparisons ", counter);
}

// function findDuplicateOptimised(arr) {
// let dataset = {};
// for (let i = 0; i < arr.length; i++) {
//   dataset[arr[i]] = dataset[arr[i]]+1 || 1;
// }
// console.log(dataset);

// for (i=0; i<3;i++){
//   console.log('hi');
// }
//}

function forofLoop() {
  // a++;
  // }

  //let j=0;
  //  while (j<3){
  //    console.log(j);
  //    j++;
  //  }

  let j = 0;
  outerwhile: do {
    //outerloop is labelled statment which is used to break or continue the specific loop.
    console.log("outer", j);
    innerfor: for (let k = 1; k < 5; k++) {
      if (k === 4) {
        break outerwhile; //breaking the outerwhile loop using labeled statement
        // continue outerwhile;          //Dangerous = continue condition can lead to infinite loop
      }
      console.log("inner", k);
    }
    j++;
  } while (j < 3);

  // let i = 0;
  // for (const logVariable of battleLog) {
  //   if ((!lastloggedEntry && lastloggedEntry !== 0) || lastloggedEntry < i) {
  //     console.log(`${i}`);
  //     for (const key in logEntry) {
  //       //  console.log(key);
  //       //  console.log(logEntry[key]);
  //       console.log(`${key} => ${logEntry[key]}`);
  //     }
  //     lastloggedEntry = i;
  //     break; //break keyword loop ko break kar deta hai jis v loop pe lagta hai wo us loop ko bahar jump kara deta hai.
  //   }
  //   i++;
  //   //console.log(logVariable);     //it will display elements of an array.
  // }
}

function printLogHandler() {
  forofLoop();
}
// findDuplicateOptimised([1, 1, 2, 3, 4, 5, 7, 6, 8, 9, 10, 12, 14, 15, 14, 8]);

attackBtn.addEventListener("click", attackhandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healingHandler);
logBtn.addEventListener("click", printLogHandler);
