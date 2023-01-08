// SPDX-License-Identifier: ANANAS
pragma solidity ^0.8.17;

contract Doom {
    uint constant INPUT_COUNT = 17;

    enum Input {
        NONE,
        MOVE_FORWARD,
        MOVE_BACKWARD,
        MOVE_LEFT,
        MOVE_RIGHT,
        TURN_LEFT,
        TURN_RIGHT,
        FIRE,
        ACTIVATE,
        WEAPON_0,
        WEAPON_1,
        WEAPON_2,
        WEAPON_3,
        WEAPON_4,
        WEAPON_5,
        WEAPON_6,
        WEAPON_7
    }

    enum LevelState {
        OK,
        SUCCESS,
        FAIL
    }

    modifier oracle_function () {
        require (msg.sender == oracle, "ORACLE ONLY ALLOWED");
        _;
    }

    address oracle;
    uint[INPUT_COUNT] votes;
    Input[] inputs;
    uint level = 0;

    constructor () {
        oracle = msg.sender;
    }

    function GetInputs () public view returns (Input[] memory) {
        return inputs;
    }

    function GetLevel () public view returns (uint) {
        return level;
    }

    function Vote (Input input) public {
        votes[uint(input)]++;
    }

    function UpdateState (LevelState new_state) public oracle_function {
        uint largest_vote = 0;
        for (uint i = 0; i < INPUT_COUNT; i++) {
            largest_vote = votes[largest_vote] > votes[i] ? largest_vote : i;
        }

        delete votes;

        if (new_state == LevelState.OK) {
            inputs.push(Input(largest_vote));
            return;
        }

        if (new_state == LevelState.SUCCESS) {
            level++;
        }

        delete inputs;
    }
}