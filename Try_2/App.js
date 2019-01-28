import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Weather from './components/Weather';
import { observable, computed, action } from "mobx";
import { observer } from 'mobx-react-native';


import { API_KEY } from './utils/WeatherAPIKey';

class WeatherData {
  id = Math.random();
  temperature = observable(0);
  pressure_here = observable(0);
  humidity_here = observable(0);
  wind = observable(0);
  weatherCondition = observable(null);

  constructor(location) {
    this.location = location;
    this.fetch()
  }

  fetchWeather = action() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?&q=${this.location}&APPID=${API_KEY}&units=metric`
      // `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    );
      .then(res => res.json())
      .then(action(json => {
          this.temperature: json.main.temp;
          this.pressure_here: json.main.pressure;
          this.humidity_here: json.main.humidity;
          this.wind: json.wind.speed;          
          this.weatherCondition: json.weather[0].main;
          // this.isLoading: true;
      }));
  }
}

observer(
  class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'enter some city' };
    input = observable('');
  }

  render() {
    return (
      <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={this.onChange}
        value={this.input}
      />
      <Button
        onPress={() => {
          this.onSubmit
        }}
        title="See Weather"
      />
      </View>
    );
  }

  onChange = action(e) => {
      this.input = e.target.value
  }
  onSubmit = action() => {
      this.props.temperatures.push(new WeatherData(this.input))
      this.input = ''
    }
}

  )

const temps = observable([])


const PreTemperature = observer(
  ({ temperatures }) => (
    <View>
      {temperatures.map( t => <PreTemperatureView key={t.id} temperature={t}/> )}
    </View>
    )
  )

const PreTemperatureView = observer(
  render() {
    const t = this.props.temperature;
    return (
      <View style={styles.container}>
            <Text>{t.temperature}</Text>
        {/*
        {t.isLoading ? (<Text>loading...</Text>) : (
            <View>
            <Text>{t.temperature}</Text>
            
                <Weather weather={t.weatherCondition} 
                 temperature={t.temperature} 
                 pressure_here={t.pressure_here} 
                 humidity_here={t.humidity_here} 
                 wind={t.wind}/>
            </View>)
        } */}
      </View>)})  


observer(
  class App extends React.Component {
    render() {
      return(
        <View>
          <PreTemperature temperatures={temps}/>
        </View>
        )
    }
  }
)

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});