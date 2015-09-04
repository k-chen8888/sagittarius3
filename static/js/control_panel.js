// Make two command arrays
// > One is a queue of not-so-important moves
// > Another is a stack of priority, game-changing moves
// -> The stack is accessible if SHIFT is held down
// ESC removes the most recent command from the queue. Likewise, SHIFT+ESC removes the most recent command from the stack.
// Commands are read every half second before anything else is executed
// - Except for state-based actions
// - This behavior should synchronize the happenings on the screen