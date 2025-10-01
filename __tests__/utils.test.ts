import '@testing-library/jest-dom';
import { attributeStatus, range, sample } from '@/app/utils';

describe('range', () => {
  it('should have parameter start working', () => {
    const expected_range = [0,1,2,3,4,5,6,7,8,9] ;
    const res_range = range(10) ;
    expect(res_range).toStrictEqual(expected_range) ;
  });
  it('should have parameters start and end working', () => {
    const expected_range = [0,1,2,3,4,5,6,7,8,9] ;
    const res_range = range(0, 10) ;
    expect(res_range).toStrictEqual(expected_range) ;
  });
  it('should have parameters start, end and step working', () => {
    const expected_range = [0,2,4,6,8] ;
    const res_range = range(0, 10, 2) ;
    expect(res_range).toStrictEqual(expected_range) ;
  });
  it('should return an empty array if start=-1', () => {
    const expected_range : number[] = [] ;
    const res_range = range(-1) ;
    expect(res_range).toStrictEqual(expected_range) ;
  });
  it('should return an empty array if end=-1', () => {
    const expected_range : number[] = [] ;
    const res_range = range(0, -1) ;
    expect(res_range).toStrictEqual(expected_range) ;
  });
  it('should return an empty array if end=0', () => {
    const expected_range : number[] = [] ;
    const res_range = range(0, 0) ;
    expect(res_range).toStrictEqual(expected_range) ;
  });
});

describe('sample', () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  it('should return the first element if  Math.random returns 0', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    const res = sample(["start", "middle", "end"]) ;
    expect(res).toBe("start") ;
  });
  it('should return the middle element if  Math.random returns .5', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(.5);
    const res = sample(["start", "middle", "end"]) ;
    expect(res).toBe("middle") ;
  });
  it('should return the middle element if  Math.random returns 1', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    const res = sample(["start", "middle", "end"]) ;
    expect(res).toBe("end") ;
  });
});

describe('attributeStatus', () => {
  it('should correctly attribute a status to each letter', () => {
    const res = attributeStatus("first", "fried");
    const expect_res = [
      {letter:'f', status:'correct'},
      {"letter": "i","status": "misplaced",},
      {"letter": "r","status": "misplaced",},
      {"letter": "s","status": "incorrect",},
      {"letter": "t","status": "incorrect",}
    ] ;
    expect(res).toStrictEqual(expect_res) ;
  });
});