const table = new Table();

table.addColumn('Glorbo', [0, 1, 2], null, false); // todo maybe first row should always be incrementing down, and at harder levels it goes down faster
table.addColumn('Frimbus', [1, 2, 3], new EventFunction((value, mapInput) => {
    mapInput.value *= value * 2;
}, 0));
table.addColumn('Shimp', [10, 20, 30], new PeriodicFunction((value, mapInput) => {
    mapInput.value -= parseFloat(value);
}, 0));

// todo a simple scoring system for now could be a high value to reach, and a low value which causes a loss. maybe with a timer as well for score
//  then can extend to pve/pvp