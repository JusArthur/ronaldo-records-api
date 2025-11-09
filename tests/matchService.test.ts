
import * as matchService from "../src/api/v1/services/matchService";
import { Match } from "../src/api/v1/models/matchModel";

const createDocMock = (data?: any) => {
  return {
    get: jest.fn().mockResolvedValue({
      exists: data !== undefined,
      id: "1",
      data: () => data,
    }),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };
};

const collectionMock = {
  get: jest.fn(),
  add: jest.fn(),
  doc: jest.fn(),
};

jest.mock("../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => collectionMock),
  },
}));

describe("Match Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a match successfully", async () => {
    const mockMatchData = { opponent: "Barcelona", date: "2021-05-01", goals: 2, assists: 1 };
    const docMock = createDocMock(mockMatchData);

    collectionMock.add.mockResolvedValue(docMock);

    const result: Match = await matchService.createMatch(mockMatchData);

    expect(collectionMock.add).toHaveBeenCalledWith(mockMatchData);
    expect(result.id).toBe("1");
    expect(result.opponent).toBe(mockMatchData.opponent);
  });

  it("should retrieve all matches successfully", async () => {
    const mockMatches = [
      { id: "1", opponent: "Juventus", date: "2022-01-01", goals: 1, assists: 0 },
    ];
    collectionMock.get.mockResolvedValue({
      docs: mockMatches.map((m) => ({ id: m.id, data: () => m })),
    });

    const result = await matchService.getAllMatches();
    expect(result).toEqual(mockMatches);
  });

  it("should delete a match successfully", async () => {
    const docMock = createDocMock({ opponent: "Real Madrid", date: "2020-08-10", goals: 1, assists: 0 });
    collectionMock.doc.mockReturnValue(docMock);

    await matchService.deleteMatch("1");

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.delete).toHaveBeenCalled();
  });

  it("should update a match successfully", async () => {
    const docMock = createDocMock({ goals: 3 });
    collectionMock.doc.mockReturnValue(docMock);

    const result = await matchService.updateMatch("1", { goals: 3 });

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.update).toHaveBeenCalledWith({ goals: 3 });
    expect(result).toEqual({ id: "1", goals: 3 });
  });

  it("should get a match by ID successfully", async () => {
    const docMock = createDocMock({ opponent: "Atletico", goals: 1, assists: 1, date: "2022-01-01" });
    collectionMock.doc.mockReturnValue(docMock);

    const result = await matchService.getMatchById("1");

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.get).toHaveBeenCalled();
    expect(result).toEqual({
      id: "1",
      opponent: "Atletico",
      goals: 1,
      assists: 1,
      date: "2022-01-01",
    });
  });
});
