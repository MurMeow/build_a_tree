import React from "react";

export class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: "true"
    }
  }

  expandFolder = (id) => {
      this.setState({
        isOpen: !this.state.isOpen
    })
  };

    render (){
      return (
        <div className={this.props.className + " block level_" + this.props.level} >
          <div className="flex"
               id={this.props.id}
               onClick= {this.expandFolder} >
            <i className={this.props.className + " " + this.state.isOpen} />
            <h3> {this.props.name} </h3>
          </div>
          {this.state.isOpen && this.props.children.length !== 0 &&
          this.props.children.map(item => {
            return this.props.recursionBuildingTree(item);
          })}
        </div>
     )
  }

}
