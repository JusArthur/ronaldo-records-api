import * as clubService from "../src/api/v1/services/clubService";
import { Club } from "../src/api/v1/models/clubModel";

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

describe("Club Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a club successfully", async () => {
    const mockClubData = {
      name: "Manchester United",
      seasons: "2003-2009",
      goals: 118,
      assists: 50,
    };
    const docMock = createDocMock(mockClubData);

    collectionMock.add.mockResolvedValue(docMock);

    const result: Club = await clubService.createClub(mockClubData);

    expect(collectionMock.add).toHaveBeenCalledWith(mockClubData);
    expect(result.id).toBe("1");
    expect(result.name).toBe(mockClubData.name);
  });

  it("should retrieve all clubs successfully", async () => {
    const mockClubs = [
      { id: "1", name: "Real Madrid", seasons: "2009-2018", goals: 450, assists: 120 },
    ];
    collectionMock.get.mockResolvedValue({
      docs: mockClubs.map((c) => ({ id: c.id, data: () => c })),
    });

    const result = await clubService.getAllClubs();
    expect(result).toEqual(mockClubs);
  });

  it("should delete a club successfully", async () => {
    const docMock = createDocMock({
      name: "Juventus",
      seasons: "2018-2021",
      goals: 101,
      assists: 22,
    });
    collectionMock.doc.mockReturnValue(docMock);

    await clubService.deleteClub("1");

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.delete).toHaveBeenCalled();
  });

  it("should update a club successfully", async () => {
    const docMock = createDocMock({ goals: 451 });
    collectionMock.doc.mockReturnValue(docMock);

    const result = await clubService.updateClub("1", { goals: 451 });

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.update).toHaveBeenCalledWith({ goals: 451 });
    expect(result).toEqual({ id: "1", goals: 451 });
  });

  it("should get a club by ID successfully", async () => {
    const mockData = {
      name: "Sporting CP",
      seasons: "2002-2003",
      goals: 5,
      assists: 3,
    };
    const docMock = createDocMock(mockData);
    collectionMock.doc.mockReturnValue(docMock);

    const result = await clubService.getClubById("1");

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.get).toHaveBeenCalled();
    expect(result).toEqual({
      id: "1",
      ...mockData,
    });
  });
});