module.exports = {
  success,
  fail,
  repair,
  get,
};

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

function success(item) {
  const { enhancement } = item
  
  if(!enhancement) {
    throw new Error("enhancement must be a valid value")
  }

  const numberCheck = isNumber(enhancement)

  if(!numberCheck){
    throw new Error("enhancement value should be a number!")
  }

  if(enhancement > 20) {
    throw new Error("enhancement cannot equal a value past the max(20)")
  }

  if(enhancement == 20) {
    return {
      message: "You've already enhanced this item to its maximum limit"
    }
  }
  
  return { 
    ...item,
    enhancement: enhancement + 1  
  };
}

function fail(item) {
  const { durability, enhancement } = item;

  if(!durability && !enhancement) {
    throw new Error("there has to be a valid value for both durability and enhancement")
  };

  const durabilityCheck = isNumber(durability);
  const enhancementCheck = isNumber(enhancement);

  if(!durabilityCheck || !enhancementCheck) {
    throw new Error("durability must be a number value")
  };

  let newItem = {};

  if(enhancement < 15) {
    newItem = {
      ...item,
      durability: durability - 5
    }
  };

  if(enhancement >= 15) {
    newItem = {
      ...item,
      durability: durability - 10
    }
  };

  if(enhancement > 16) {
    newItem = {
      ...newItem,
      enhancement: enhancement - 1
    }
  }

  return newItem;
}

function repair(item) {
  const { durability } = item;
  
  if (!durability) {
    throw new Error("No Durability")
  }
  
  const numberCheck = isNumber(durability)
  
  if(!numberCheck) {
    throw new Error("Durability must be a number value")
  }

  if(durability > 100) {
    throw new Error("Durability cannot be greater than 100")
  }

  if(durability === 100) {
    return {
      message: "Your item is already fixed you big oaf."
    }
  }
  
  const newItem = {
    ...item,
    durability: 100
  }
  
  return newItem;
}

// function get(item) {
//   return { ...item };
// }
