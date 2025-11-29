import * as awardService from "../src/api/v1/services/awardService";
import { Award } from "../src/api/v1/models/awardModel";

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

describe("Award Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an award successfully", async () => {
    const mockAwardData = { name: "Ballon d'Or", year: 2017 };
    const docMock = createDocMock(mockAwardData);

    collectionMock.add.mockResolvedValue(docMock);

    const result: Award = await awardService.createAward(mockAwardData);

    expect(collectionMock.add).toHaveBeenCalledWith(mockAwardData);
    expect(result.id).toBe("1");
    expect(result.name).toBe(mockAwardData.name);
  });

  it("should retrieve all awards successfully", async () => {
    const mockAwards = [
      { id: "1", name: "Golden Boot", year: 2014 },
    ];
    collectionMock.get.mockResolvedValue({
      docs: mockAwards.map((a) => ({ id: a.id, data: () => a })),
    });

    const result = await awardService.getAllAwards();
    expect(result).toEqual(mockAwards);
  });

  it("should delete an award successfully", async () => {
    const docMock = createDocMock({ name: "FIFA Best Player", year: 2016 });
    collectionMock.doc.mockReturnValue(docMock);

    await awardService.deleteAward("1");

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.delete).toHaveBeenCalled();
  });

  it("should update an award successfully", async () => {
    const docMock = createDocMock({ year: 2018 });
    collectionMock.doc.mockReturnValue(docMock);

    const result = await awardService.updateAward("1", { year: 2018 });

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.update).toHaveBeenCalledWith({ year: 2018 });
    expect(result).toEqual({ id: "1", year: 2018 });
  });

  it("should get an award by ID successfully", async () => {
    const mockData = { name: "Puskas Award", year: 2009 };
    const docMock = createDocMock(mockData);
    collectionMock.doc.mockReturnValue(docMock);

    const result = await awardService.getAwardById("1");

    expect(collectionMock.doc).toHaveBeenCalledWith("1");
    expect(docMock.get).toHaveBeenCalled();
    expect(result).toEqual({
      id: "1",
      ...mockData,
    });
  });
});