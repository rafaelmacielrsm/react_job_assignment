import { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import palette from '../../stylesheets/ui.scss'
import { getInfectedReport, getAverageItemsReport, getPointsLost,
  unpackAverageReport, unpackInfectedReport, unpackPointsLostReport }
  from '../../lib/AxiosHelper'
import InfectionReportPie from './charts/InfectionReportPie'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
   TableRowColumn} from 'material-ui/Table';

class Reports extends Component {
  state = {
    infected: { hasLoaded: false },
    averageItems: { hasLoaded: false },
    lostPoints: { hasLoaded: false }
  }

  handleInfectedReport = (retryTimeout = 4000) => {
    var promiseObj = getInfectedReport();
    promiseObj
      .then(response => {

        const {infected , nonInfected } = unpackInfectedReport(response.data);

        this.setState({
          infected: {
            hasLoaded: true, infected, nonInfected }});

      }).catch(error => {

        if (error.response) {
          this.setState({
            alertMessage: 'There was an error loading the data'
          });

        }else if (error.request) {
          setTimeout(this.handleInfectedReport, retryTimeout)
        }

      })
  }

  handleAverageItemReport = (retryTimeout = 4000) => {
    var promiseObj = getAverageItemsReport();
    promiseObj
      .then(response => {

        const {total, nonInfected} = unpackAverageReport(response.data);

        this.setState({
          averageItems: {
            hasLoaded: true, total, nonInfected }});

      }).catch(error => {

        if (error.response) {
          this.setState({
            alertMessage: 'There was an error loading the data'
          });

        }else if (error.request) {
          setTimeout(this.handleAverageItemReport, retryTimeout)
        }

    })
  }

  handleLostPointsReport = (retryTimeout = 4000) => {
    var promiseObj = getPointsLost();
    promiseObj
      .then(response => {

        const { total } = unpackPointsLostReport(response.data)

        this.setState({
          lostPoints: {
            hasLoaded: true, total }});

      }).catch(error => {

        if (error.response) {
          this.setState({
            alertMessage: 'There was an error loading the data'
          });

        }else if (error.request) {
          setTimeout(this.handleAverageItemReport, retryTimeout)
        }

      })
  }

  componentDidMount() {
    this.handleInfectedReport();
    this.handleAverageItemReport();
    this.handleLostPointsReport();
  }

  render(){
    const { infected, averageItems, lostPoints } = this.state

    return(
      <div className="reports">
        <div id="infected-report-container">
          { !infected.hasLoaded ?
            <CircularProgress size={80} thickness={5}
              color={palette.accent_color} />
              :
            <div id="loaded-report">
              <h3>Population Distribuition</h3>
              <InfectionReportPie infected={infected.infected}
                nonInfected={infected.nonInfected} />
            </div>
          }
        </div>

        <div id="report-card">
          { !averageItems.hasLoaded ?
            <CircularProgress size={80} thickness={5}
              color={palette.accent_color} /> :
              <ReportTable total={averageItems.total}
                nonInfected={averageItems.nonInfected}/>
          }
        </div>

        <div id="report-card">
          { !lostPoints.hasLoaded ?
            <CircularProgress size={80} thickness={5}
              color={palette.accent_color} /> :
              <ItemLostTable total={lostPoints.total}/>
          }
        </div>
      </div>
    );
  }
}

export default Reports

const ReportTable = ({total, nonInfected}) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn colSpan="2"
          style={{fontSize: '1.5rem', textAlign: 'center'}}>
          Average quantity of items for</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn style={{fontSize: '1.25rem', textAlign: 'center'}} >
          Total Population</TableRowColumn>
        <TableRowColumn style={{fontSize: '1.25rem', textAlign: 'center'}}>
          {total.toFixed(3)}
        </TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn style={{fontSize: '1.25rem', textAlign: 'center'}}>
          Healthy Population</TableRowColumn>
        <TableRowColumn style={{fontSize: '1.25rem', textAlign: 'center'}}>
          {total.toFixed(3)}
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

const ItemLostTable = ({total}) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn colSpan="2"
          style={{fontSize: '1.5rem', textAlign: 'center'}}>
          Resources lost with infections</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn style={{fontSize: '1.25rem', textAlign: 'center'}}>
          Points Value</TableRowColumn>
        <TableRowColumn style={{fontSize: '1.25rem', textAlign: 'center'}}>
          {total}
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);
