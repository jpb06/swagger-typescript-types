/* eslint-disable complexity */
import { displayWarning } from '../../cli/console/console.messages';

import { PropName } from './enum/propName.enum';
import { PropType } from './enum/propType.enum';

export const getExampleFromType = (
  propName: string,
  type: string,
): string | undefined => {
<<<<<<< HEAD
  switch (type) {
=======
  switch (type?.toLowerCase()) {
>>>>>>> 9c1a687 (chore: add mock example)
    case PropType.string:
      return `'${getExampleFromString(propName)}'`;

    case PropType.number:
    case PropType.integer:
      return getExampleFromNumber(propName).toString();

    case PropType.boolean:
      return getExampleFromBoolean(propName).toString();
<<<<<<< HEAD
=======

    case PropType.object:
      return `'${getExampleFromObject(propName)}'`;

    case PropType.date:
      return `${getExampleFromDate(propName)}`;
>>>>>>> 9c1a687 (chore: add mock example)
  }

  displayWarning(`Unable to extract example from ${propName} and ${type}`);
  return undefined;
};

export const getExampleFromString = (propName: string): string => {
  switch (propName) {
    case PropName.id:
      return '123';
    case PropName.idHubloPoolOffer:
    case PropName.hubloId:
      return 'a9e536a6-e500-11ed-b5ea-0242ac120002';
    case PropName.email:
    case PropName.subject:
      return 'jean.dupont@hublo.com';
    case PropName.mobilePhone:
    case PropName.phone:
      return '0123456789';
    case PropName.password:
      return 'password1234';
    case PropName.activeAt:
    case PropName.createdAt:
    case PropName.updatedAt:
    case PropName.deletedAt:
    case PropName.churnedAt:
    case PropName.closedAt:
      return '2021-12-31T23:59:59.999Z';
    case PropName.beginAt:
      return '2022-12-31T08:00:00.000Z';
    case PropName.endAt:
      return '2022-12-31T18:00:00.000Z';
    case PropName.timezone:
      return `Europe/Paris`;
    case PropName.firstName:
      return `Jean`;
    case PropName.lastName:
      return `Dupont`;
    case PropName.departmentName:
      return 'Ile de France';
    case PropName.institutionName:
      return 'Hopital de Paris';
    case PropName.nameAbsentPerson:
      return 'Michel Dupont';
    case PropName.civility:
      return 'Madame';
    case PropName.employmentLabel:
      return 'IDE';
    case PropName.position:
      return 'II';
    case PropName.sectorLabel:
      return 'FILIERE SOIGNANTE';
    case PropName.levelLabel:
      return 'NIVEAU 2';
    case PropName.groupLabel:
      return 'GROUPE B';
    case PropName.jobCategory:
      return 'TECHNICIEN HAUTEMENT QUALIFIE';
    case PropName.weeklyHours:
      return 'some weeklyHours';
    case PropName.dateSlot:
    case PropName.dateSlotEndAt:
    case PropName.dateSlotBeginAt:
      return '2022-01-02-1';
    case PropName.genericJobId:
      return 'registered_nurse';
    case PropName.genericSpecialtyId:
      return 'registered_nurse#geriatric_care';
    default:
      return `${propName}`;
  }
};

export const getExampleFromNumber = (propName: string): number => {
  switch (propName) {
    case PropName.id:
      return 12345;
    case PropName.timestamp:
      return 1682602405;
    case PropName.statusCode:
      return 400;
    case PropName.idAgencyRequest:
      return 123456;
    case PropName.typeAdmin:
    case PropName.adminLevel:
      return 1;
    case PropName.delay:
      return 60;
    case PropName.nbWorkedMinutes:
      return 600;
    case PropName.status:
      return 1;
    case PropName.monthIndex:
      return 2;
    case PropName.year:
      return 2022;
    case PropName.doneMissions:
      return 10;
    case PropName.hoursWorked:
      return 10;
    case PropName.idWorker:
      return 123456;
    case PropName.idMission:
      return 1234567;
    case PropName.whichSlot:
      return 1;
    default:
      return 123;
  }
};

export const getExampleFromBoolean = (propName: string): boolean => {
  switch (propName) {
    case PropName.isChurn:
      return false;
    default:
      return true;
  }
};
<<<<<<< HEAD
=======

export const getExampleFromObject = (propName: string): string => {
  switch (propName) {
    default:
      return JSON.stringify({
        'some unknown object':
          'please add an example in the DTO to remove this warning',
      });
  }
};

export const getExampleFromDate = (propName: string): string => {
  switch (propName) {
    default:
      return 'new Date(2021-12-31T23:59:59.999Z)';
  }
};
>>>>>>> 9c1a687 (chore: add mock example)
