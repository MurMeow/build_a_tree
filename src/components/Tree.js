import React, { Fragment } from "react";
import "./../styles.css";
import { Folder } from "./Folder";

export class Tree extends React.Component {

    buildingTree = objTree => {
        return (
            <div key={objTree.name + objTree.id + objTree.level}>
                <Folder
                    name={objTree.name}
                    className={objTree.classNameGroup}
                    level={objTree.level}
                    id={objTree.id}
                    key={objTree.name + objTree.id}
                    onExpander={this.expandFolder}
                    children={objTree.children.length !== 0 ?
                    objTree.children : []}
                    recursionBuildingTree={this.buildingTree}
                />
            </div>
        );
    };

    tree = this.buildingTree(this.props.objTree);

    render() {
        return <Fragment>{this.tree}</Fragment>;
    }
}
