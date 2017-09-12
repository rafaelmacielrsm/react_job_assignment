import Paper from 'material-ui/Paper';
import { MapComponent } from './MapComponent'
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import ReplayIcon from 'material-ui/svg-icons/av/replay';

export const Overview = (props) => (
  <div className="overview">
    <div className="left">

      <div className="personal-info">
        <h2>My Info</h2>
        <p><strong>Name:</strong> {props.user.name}</p>
        <p><strong>Age: </strong> {props.user.age}</p>
        <p><strong>Gender: </strong> {props.user.gender == 'F' ? "Female" : "Male"}</p>
      </div>

      <div className="inventory-container">
        <InventoryOverview items={props.items}
          handleGetItems={props.handleGetItems}/>
      </div>

    </div>
    <div className="right">
      <MapComponent
        handleNewLocation={props.handleNewLocation}
        lat={parseFloat(props.user.position.latitude)}
        lng={parseFloat(props.user.position.longitude)}
        zoom={18}
      />
    </div>
  </div>
);

const InventoryOverview = (props) => {

  const itemContainer = (name) => (
    <div className="item-container" >
      <div id={`icon-${name.toLowerCase()}`}></div>
      {props.items.hasLoadedItems ?
        <p>{props.items[name] ? props.items[name].quantity : 0} {name}</p>:
        <p>No info received yet...</p>
      }
    </div>
  );
  return(
    <div className="inventory">
      <div id="header-inventory">
        <h2>Inventory</h2>
        {!props.items.hasLoadedItems ?
          <RaisedButton
            icon={<ReplayIcon />}
            secondary={true}
            onClick={() => props.handleGetItems()}
          /> : null}
      </div>

      <div id="inventory-list">

        {itemContainer("Water")}
        {itemContainer("Food")}
        {itemContainer("Medication")}
        {itemContainer("Ammunition")}

      </div>
    </div>
  );
}
