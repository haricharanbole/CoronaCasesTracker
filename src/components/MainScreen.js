/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
    };
    this.processCountryArgument = this.processCountryArgument.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
  }

  async processCountryArgument() {
    this.setState({
      data: {},
      loading: true,
    });
    const response = await fetch(
      'https://corona.lmao.ninja/v2/countries/india',
    );
    const data = await response.json();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = this.numberWithCommas(data[key]);
      }
    }
    this.setState({
      data: data,
      loading: false,
    });
  }
  numberWithCommas(numberToFormat) {
    return numberToFormat.toString().split('.')[0].length > 3
      ? numberToFormat
          .toString()
          .substring(0, numberToFormat.toString().split('.')[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
          ',' +
          numberToFormat
            .toString()
            .substring(numberToFormat.toString().split('.')[0].length - 3)
      : numberToFormat.toString();
  }
  componentDidMount() {
    this.processCountryArgument();
  }
  render() {
    return (
      <>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.hederText}>COVID19 - INDIA</Text>
            </View>
            <View style={styles.loading}>
              {this.state.loading ? <Text>Loading</Text> : <Text />}
            </View>
            <View style={styles.topContainer}>
              <View
                style={[
                  styles.entryStrip,
                  {
                    backgroundColor: '#DCDCDC',
                  },
                ]}>
                <View style={styles.stripTextView}>
                  <Text style={styles.stripText}>Total Cases</Text>
                </View>
                <View style={styles.stripDataView}>
                  <Text style={[styles.stripData, {color: 'blue'}]}>
                    {this.state.data.cases}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.entryStrip,
                  {
                    backgroundColor: '#E0E0E0',
                  },
                ]}>
                <View style={styles.stripTextView}>
                  <Text style={styles.stripText}>Today's Cases</Text>
                </View>
                <View style={styles.stripDataView}>
                  <Text style={[styles.stripData, {color: 'red'}]}>
                    {this.state.data.todayCases}{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.entryStrip,
                  {
                    backgroundColor: '#E8E8E8',
                  },
                ]}>
                <View style={styles.stripTextView}>
                  <Text style={styles.stripText}>Active Cases</Text>
                </View>
                <View style={styles.stripDataView}>
                  <Text style={[styles.stripData, {color: 'orange'}]}>
                    {this.state.data.active}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.entryStrip,
                  {
                    backgroundColor: '#F0F0F0',
                  },
                ]}>
                <View style={styles.stripTextView}>
                  <Text style={styles.stripText}>Recovered Cases</Text>
                </View>
                <View style={styles.stripDataView}>
                  <Text style={[styles.stripData, {color: 'green'}]}>
                    {this.state.data.recovered}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.entryStrip,
                  {
                    backgroundColor: '#F5F5F5',
                  },
                ]}>
                <View style={styles.stripTextView}>
                  <Text style={styles.stripText}>Critical Cases</Text>
                </View>
                <View style={styles.stripDataView}>
                  <Text style={[styles.stripData, {color: 'red'}]}>
                    {this.state.data.critical}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.entryStrip,
                  {
                    backgroundColor: '#F8F8F8',
                  },
                ]}>
                <View style={styles.stripTextView}>
                  <Text style={styles.stripText}>Total Deaths</Text>
                </View>
                <View style={styles.stripDataView}>
                  <Text style={[styles.stripData, {color: 'black'}]}>
                    {this.state.data.deaths}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.entryStrip,
                  {
                    backgroundColor: '#FFFFFF',
                  },
                ]}>
                <View style={styles.stripTextView}>
                  <Text style={styles.stripText}>Today's Deaths</Text>
                </View>
                <View style={styles.stripDataView}>
                  <Text style={[styles.stripData, {color: 'black'}]}>
                    {this.state.data.todayDeaths}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={this.processCountryArgument}>
                <Image
                  source={require('../assets/loop.png')}
                  style={styles.refreshImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: wp('100%'),
    height: hp('15%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: wp('100%'),
    height: hp('5%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    width: wp('100%'),
    height: hp('70%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
  },
  hederText: {
    fontSize: hp('6%'),
  },
  footer: {
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryStrip: {
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('10%'),
    borderTopWidth: 0.1,
    borderTopColor: 'black',
  },
  stripTextView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: wp('10%'),
  },
  stripDataView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: wp('10%'),
  },
  stripText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  stripData: {
    fontSize: hp('3%'),
    fontWeight: '700',
  },
  refreshImage: {
    height: hp('5%'),
    width: hp('5%'),
  },
});

export default MainScreen;
