const matchStates = {
  notstarted: '',
  h1: 'First Half',
  hf: 'Half time',
  h2: 'Second Half',
  finished: 'Finished',
};
const matchTypes = {
  group: 'Group Stage',
  R16: 'Round of 16',
  QR: 'Quarter-finals',
  semi: 'Semi-finals',
  '3RD': 'Thrid place play-off',
  FIN: 'Final',
};
const todayMatchesEl = document.querySelector('.today-matches');

async function getTodayMatches(token) {
  const date = new Date();
  const today = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const res = await fetch(proxy + 'http://api.cup2022.ir/api/v1/bydate', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Access-Control-Allow-Origin': 'http://localhost:5500/',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: today,
    }),
  });
  const data = await res.json();

  const matches = data.data;
  renderMatches(matches, todayMatchesEl);
}

function compareDateToTodaysDate(date) {
  const todayDate = new Date();
  const yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1));

  switch (date.getDate()) {
    case yesterdayDate.getDate():
      date = 'Yesterday';
      break;
    case todayDate.getDate():
      date = 'Today';
      break;
    case tomorrowDate.getDate():
      date = 'Tomorrow';
      break;
    default:
      date = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      break;
  }
  return date;
}

function renderMatches(matches, element) {
  let date, time, matchType;

  const matchesEl = matches.map((match) => {
    // get match type
    matchType = matchTypes[match.type];

    // get date and time of the match
    [date, time] = match.local_date.split(' ');

    // format date to Today, tomorrow, yesterday or 'Fri, Oct 10'
    date = compareDateToTodaysDate(new Date(date));

    // check if match is live
    const live =
      matchStates[match.time_elapsed] &&
      matchStates[match.time_elapsed] !== 'Finished';

    // check if match finished
    const finished = matchStates[match.time_elapsed] === 'Finished';

    // if match is finished or still live don't show time
    time = finished || live ? '' : time;

    // if match live don't show date
    let thisMatchDate = live ? '' : date;

    // html
    return `
        <div class="match-container">
            <div class="group">
                <h4>${
                  matchType === 'Group Stage'
                    ? `Group ${match.group}`
                    : matchType
                }</h4>
            </div>
            <div class="match">
            <div class="teams">
                <div class="team home-team">
                    <div class="team-info">
                        <img class="flag" src="${match.home_flag}"
                            alt="${match.home_team_en}" />
                        <div class="name">${match.home_team_en}</div>
                    </div>
                    <div class="score">${match.home_score}</div>
                </div>
                <div class="team away-team">
                    <div class="team-info">
                        <img class="flag" src="${match.away_flag}"
                        alt="${match.away_team_en}" />
                        <div class="name">${match.away_team_en}</div>
                    </div>
                    <div class="score">${match.away_score}</div>
                </div>
            </div>
            <div class="match-state">
                <div class="state">${matchStates[match.time_elapsed]}</div>
                <div class="date">${thisMatchDate}</div>
                <div class="time">${time}</div>
            </div>
            </div>
        </div>
    `;
  });

  element.innerHTML = `
        <div class="matches">
            <div class="stage">
                <h3>${matchType} - ${date}</h3>
            </div>
            <div class="container">
                ${matchesEl.join('')}
            </div>
        </div>
    `;
}
