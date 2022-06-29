import Matches from '../models/Matches';
import Teams from '../models/Teams';

export default class MatchesService {
  static async getAll() {
    const matches = Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  static async createMatch(matchInfo: {
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
    inProgress: boolean,
  }) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = matchInfo;
    const match = await Matches.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });
    return match;
  }
}