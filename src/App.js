import React from "react";
import "./styles.css";
import { Tree } from "./components/Tree";
import { determineParents } from "./helpers";

let tree = {};
const formTree = data => {
    tree = data;
};

export default class App extends React.Component {
    constructor(props) {
        determineParents(formTree);
        super(props);
        this.state = {
            objTree: tree
        };

    };

    render() {
        return (
            <div className="App">
                <h1>Tree</h1>
                <div className="tree">
                    <Tree objTree={this.state.objTree} />
                </div>
            </div>
        );
    }
}
