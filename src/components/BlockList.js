import React from "react";
import List from "./List";

class BlockList extends React.Component {
    render() {
        const {
            list,
            removeButtonDisabled,
            removeAction,
            editAction
        } = this.props;

        return (
            <div className="row">
                <div className="col-6 mx-auto">
                    <List list={list}
                          listClasses={"list"}
                          removeButtonDisabled={removeButtonDisabled}
                          removeAction={removeAction}
                          editAction={editAction}
                          elemValueClasses={"list-element"}
                          btnEditClasses={"btn btn-primary list-btn-edit"}
                          btnRemoveClasses={"btn btn-primary list-btn-remove"}
                    />
                </div>
            </div>
        );
    }
}

export default BlockList;