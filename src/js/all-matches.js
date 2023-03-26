const allMatchesEl = document.querySelector('.all-matches');

async function getAllMatches(token) {
  const res = await fetch(proxy + 'http://api.cup2022.ir/api/v1/match', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Access-Control-Allow-Origin': 'http://localhost:5500/',
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  let matches = data.data;
  matches = sortMatches(matches);
  matches = tobedeterminedMatches(matches);
  console.log(matches);
  renderAllMatches(matches, allMatchesEl);
}

function sortMatches(matches) {
  let sortedMatchesByDay = {};

  matches.forEach((match) => {
    const [date, time] = match.local_date.split(' ');

    if (sortedMatchesByDay.hasOwnProperty(date)) {
      sortedMatchesByDay[date] = [...sortedMatchesByDay[date], match];
    } else {
      sortedMatchesByDay[date] = [match];
    }
  });

  return Object.values(sortedMatchesByDay).sort(
    (day1, day2) =>
      new Date(day1[0].local_date).getTime() >
      new Date(day2[0].local_date).getTime()
  );
}

function tobedeterminedMatches(matches) {
  return matches.map((matchesOfDay) => {
    return matchesOfDay.map((match) => {
      if (!match.away_flag) {
        return {
          ...match,
          away_flag: './src/img/Unknown.svg',
          home_flag: './src/img/Unknown.svg',
          home_team_en: 'TBD',
          away_team_en: 'TBD',
        };
      }
      return match;
    });
  });
}

function renderAllMatches(matches, element) {
  element.innerHTML = '';
  matches.forEach((matchesOfDay) => {
    const div = document.createElement('div');
    renderMatches(matchesOfDay, div);
    element.appendChild(div);
  });
}
