// SPDX-License-Identifier: MIT 

pragma solidity >=0.8.7;

contract Activities {
    
    event Brush(string name, uint time);
    event Lunch(string name, uint time, string indexed meal);
    event Play(string name, uint time, string indexed sport);
    
    function morning(string calldata _name, uint _time) external {
        emit Brush(_name, _time);
    }
    
    function eat(string calldata _name, uint _time, string calldata _meal) external {
        emit Lunch(_name, _time, _meal);
    }
    
    function evening(string calldata _name, uint _time, string calldata _sport) external {
        emit Play(_name, _time, _sport);
    }
}

contract Person {
    
    Activities activities = new Activities();

    event Wake(string name, bool earlyRiser);

    function aDayInTheLife(string calldata _name) public {
        bool earlyRiser = block.basefee % 2 == 0;
        
        emit Wake(_name, earlyRiser);

        if (earlyRiser) {
            activities.morning(_name, 1000);
            activities.eat(_name, 1300, "Sandwich");
            activities.evening(_name, 1800, "Basketball");
        } else {
            activities.morning(_name, 1100);
            activities.eat(_name, 1400, "Chole Bhature");
            activities.evening(_name, 1900, "Football");
        }        
    }
}