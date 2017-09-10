import  AppTheme  from './AppTheme'
import CircularProgress from 'material-ui/CircularProgress';

const PageLoading = (props) =>
  <div id="loading">
    <AppTheme component={CircularProgress}
      size={100}
      thickness={5}
      color={props.color}/>
  </div>

export default PageLoading;
