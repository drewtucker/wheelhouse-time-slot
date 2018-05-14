
  //API REQUEST
  let request = new XMLHttpRequest();
  let url = `https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json`;
  const scheduleDays = [];

  request.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      getElements(response);
    }
  }

  request.open('GET', url, true);
  request.send();

  //FORMAT RESPONSE INTO READABLE DATA
  getElements = function(response) {
    let timeSlots = response['scheduleDays'][0]['timeSlots'];
    timeSlots.forEach(function(timeSlot) {
      let minutes = new Date(timeSlot.slotDateTime).getMinutes().toString();
      let hours = new Date(timeSlot.slotDateTime).getHours();

      if(minutes === '0') {
        minutes = '00';
      }
      if(hours > 12) {
        hours = (hours % 12) + ':';
        minutes = minutes + 'p';
      }
      else {
        hours = hours + ':';
        minutes = minutes + 'a';
      }

      let formattedTime = hours + minutes;
      scheduleDays.push(formattedTime);
    })

    //RENDER CONTENT IN DOM
    document.getElementById('addContentHere').innerHTML +=`
    <div class='widgetWrapper'>
      <div class='heading'>
        <h2 class='title'>Book Online</h2>
        <a class='widgetLink1' href='http://www.wheelhousetesting.net/'><strong>What do we treat?</strong></a>
        <a class='widgetLink2' href='http://www.wheelhousetesting.net/'><strong>How much will it cost?</strong></a>
      </div>
      <hr/>
      <h3>Tomorrow</h3>
      <div id='buttonWrapper'>
      </div>
    </div>
    <style>
      .widgetWrapper { overflow: hidden; width: 420px; margin: 10px; padding: 15px; border: 1.5px solid lightgrey;} .btn { width: 95%; height: 40px; color: white; margin-left: 10px; margin-right: 0; padding: 0; margin-bottom: 15px; background-color: #006bb3; font-size: 1px;} #more-button { background-color: white; font-weight: bold; color: #333333; border-color: slategray; border-width: 1.5px;} hr { margin-top: 10px; margin-bottom: 10px; width: 1000%; margin-left: -500%; border-color: #006bb3; border-width: 3.5px;} .widgetLink2 { margin-left: 65px;} .col-xs-3 { max-width: 100px; padding: 0; margin: 0 auto;} .title {margin-top: 0px;} .timeSlot { text-align: center; margin: 0; padding: 0;} button h4 { font-size: 15px; font-weight: lighter;}
    </style>
    `;
    let firstRow = document.createElement('div');
    let secondRow = document.createElement('div');
    let thirdRow = document.createElement('div');
    let buttonWrapper = document.getElementById('buttonWrapper');
    let currentRow;

    firstRow.className = 'row';
    secondRow.className = 'row';
    thirdRow.className = 'row';

    buttonWrapper.appendChild(firstRow);
    buttonWrapper.appendChild(secondRow);
    buttonWrapper.appendChild(thirdRow);


    for (let i = 0; i < 12; i ++) {
      if (i < 4) {
        currentRow = firstRow;
      }
      else if (i < 8) {
        currentRow = secondRow;
      }

      else if (i < 12) {
        currentRow = thirdRow;
      }
    //LOGIC FOR FINAL BUTTON IN LIST
    if(i === 11) {
      let div = document.createElement('div');
      div.className = 'col-xs-3';
      currentRow.appendChild(div);
      div.innerHTML = `
      <div class='timeSlot'><button id='more-button' class='btn btn-default'><h4>More</h4></button></div>
      `
    }
    //LOGIC FOR BUTTONS 1-11
    else {
      let div = document.createElement('div');
      div.className = 'col-xs-3';
      currentRow.appendChild(div);
      div.innerHTML = `
      <div class='timeSlot'><button class='btn btn-primary'><h4>${scheduleDays[i]}</h4></button></div>
      `
    }

  }

  }
