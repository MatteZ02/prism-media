/* eslint-disable */

const fs = require('fs');
const prism = require('../');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const { roughlyEquals, streamToBuffer } = require('./util');

test('OggOpus Demuxer available', () => {
  expect(prism.ogg.Demuxer).toBeTruthy();
});

test('Webm Demuxer available', () => {
  expect(new prism.webm.Demuxer('opus')).toBeTruthy();
  expect(new prism.webm.Demuxer('vorbis')).toBeTruthy();
  expect(prism.webm.Demuxer.TOO_SHORT).toBeTruthy();
  expect(prism.webm.Demuxer.TAGS).toBeTruthy();
});

test('Opus encoders/decoders & constants available', () => {
  expect(prism.opus).toBeTruthy();
  expect(prism.opus.constants).toBeTruthy();
  expect(prism.opus.Encoder).toBeTruthy();
  expect(prism.opus.Decoder).toBeTruthy();
});

test('OggOpus demuxer is sane', async done => {
  expect.assertions(1);
  const output = fs.createReadStream('./test/audio/speech_orig.ogg').pipe(new prism.ogg.Demuxer());
  const chunks = await streamToBuffer(output);
  const file = await readFile('./test/audio/speech_orig.opusdump');
  expect(roughlyEquals(file, chunks)).toEqual(true);
  done();
});
