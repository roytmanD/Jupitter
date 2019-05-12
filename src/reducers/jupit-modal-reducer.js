export function jupitModalReducer(state = {isOpen: false}, action) {
   switch (action.type) {
       case'open':
           return {isOpen: true};
       case 'close':
           return {isOpen: false};
       default:
          return {isOpen: state.isOpen};

   }
}