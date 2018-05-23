export const timeSegments = [];

export const spiltIntoTwentyMins = (workoutData) => {
  const secondsPast = 1200000;
  let twentyMinChuncks;

  const session = workoutData.filter( (session,index) => {
    let timePast = session.millisecondOffset;
    if (timePast === secondsPast) {
      session.index = index + 1;
      return session;
    }
  });

  twentyMinChuncks = workoutData.splice(0, session[0].index) 
  
  timeSegments.push(twentyMinChuncks);

  if (workoutData[0].millisecondOffset >= secondsPast) {
    workoutData.forEach( session => {
      let milliseconds = session.millisecondOffset
      session.millisecondOffset = milliseconds - secondsPast;
    });
  }
  
  if(workoutData.length <= 216 ) {
    const remainder = workoutData.splice(0, workoutData.length)
    timeSegments.push(remainder);
    return timeSegments;
  }

  spiltIntoTwentyMins(workoutData);

}


export const findBest = timeSegments => {
  let highestPower = 0;

  timeSegments.forEach(intervals => {
    intervals.forEach( second => {
      let power = second.values.power
      if (power > highestPower) {
        highestPower = power;
      } 
    });
  });

  const topPerformance = timeSegments.reduce((best20, interval, index) => {
    interval.forEach( second => {
      let power = second.values.power      
      if (second.values.power === highestPower) {
        best20.push(...interval);
      }
    }); 
    return best20;
  }, []);

  return topPerformance;
}

export const gpsRoute = workoutData => {
  const startPoint = workoutData.slice(5, workoutData.length);
  const gps = startPoint.map((second, index, array) => {
    let lat = second.values.positionLat;
    let lng = second.values.positionLong;

    if (lat === undefined || lng === undefined) {
      lat = array[index-1].values.positionLat;
      lng = array[index-1].values.positionLong;
    }

    return {
      lat,
      lng
    }
  });
  console.log(gps)
  return gps;
}

export const performanceData = topPerformance => {

  const output = topPerformance.map(second => {
    let seconds = second.millisecondOffset / 1000 / 60;
    return {
      time: seconds,
      power: second.values.power
    }
  }); 

  return output;
}




