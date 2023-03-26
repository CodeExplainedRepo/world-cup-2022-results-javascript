const standingsEl = document.querySelector('.standings');

async function getStandings(token) {
  try {
    const res = await fetch(proxy + 'http://api.cup2022.ir/api/v1/standings', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': 'http://localhost:5500/',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    const standings = data.data;

    renderStandings(standings, standingsEl);
  } catch (error) {
    alert(error);
  }
}

function renderStandings(standings, element) {
  element.innerHTML = '';

  standings.forEach((group) => {
    const orderedTeams = orderTeams(group.teams);
    const teamsEl = orderedTeams.map((team, index) => {
      return `
        <div class="team">
          <div class="name">
            <div class="index">${index + 1}</div>
            <img src="${team.flag}" alt="${team.name_en}" />
            <div class="team-name">${team.name_en}</div>
          </div>
          <div class="stats">${team.mp}</div>
          <div class="stats">${team.w}</div>
          <div class="stats">${team.d}</div>
          <div class="stats">${team.l}</div>
          <div class="stats">${team.gf}</div>
          <div class="stats">${team.ga}</div>
          <div class="stats">${team.gd}</div>
          <div class="stats">${team.pts}</div>
        </div>
      `;
    });
    const groupEl = `
        <div class="group">
          <div class="group-title">
            <h3>Group ${group.group}</h3>
          </div>
          <div class="header-row">
            <div class="name">Team</div>
            <div class="stats">MP</div>
            <div class="stats">W</div>
            <div class="stats">D</div>
            <div class="stats">L</div>
            <div class="stats">GF</div>
            <div class="stats">GA</div>
            <div class="stats">GD</div>
            <div class="stats">Pts</div>
          </div>
          <div class="teams">
            ${teamsEl.join('')}
          </div>
      </div>
    `;
    element.innerHTML += groupEl;
  });
}

function orderTeams(teams) {
  return teams.sort((teamA, teamB) => {
    if (teamA.pts === teamB.pts) {
      if (teamA.gd === teamB.gd) {
        return teamA.gf < teamB.gf;
      }
      return teamA.gd < teamB.gd;
    }
    return teamA.pts < teamB.pts;
  });
}
