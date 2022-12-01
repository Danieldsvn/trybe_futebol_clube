import { Response } from 'express';

export default class MatchValidations {
  static equalTeams(res: Response, homeTeam: number, awayTeam: number) {
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
  }
}
